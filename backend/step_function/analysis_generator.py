import json
import os
import time
import uuid
from io import StringIO

import boto3
import csv
import concurrent.futures
from datetime import datetime, timedelta

from utils.s3_utils import upload_file_to_s3
from utils.sf_utils import download_parameters_from_s3

cloudwatch_client = boto3.client("logs")
lambda_client = boto3.client("lambda")
bucket_name = os.environ['BUCKET_NAME']


def lambda_handler(event, context):
    lambda_functions_name = download_parameters_from_s3(event['lambda_functions_name'])
    report_id = event.get('report_id')
    start_date = event.get('start_date')
    end_date = event.get('end_date')
    return generate_cost_report(lambda_functions_name, report_id, start_date, end_date)


def get_lambda_cost(lambda_name, start_date, end_date):
    start_datetime = datetime.fromisoformat(start_date.replace("Z", "+00:00"))
    end_datetime = datetime.fromisoformat(end_date.replace("Z", "+00:00"))
    response = lambda_client.get_function_configuration(FunctionName=lambda_name)

    runtime, memory_size, architecture = response['Runtime'], response['MemorySize'], response['Architectures'][0]
    storage_size, log_group_name = response['EphemeralStorage']['Size'], response['LoggingConfig']['LogGroup']
    if not check_log_group_exist(log_group_name):
        return None
    query_response = run_cloudwatch_query(log_group_name, start_datetime, end_datetime, memory_size, storage_size,
                                          architecture)
    if not query_response:
        return None

    results = query_response[0]
    answer = {"functionName": lambda_name, "runtime": runtime, "architecture": architecture}
    for result in results:
        field, value = result['field'], result['value']
        answer[field] = value
    if float(answer['potentialSavings']) < 0:
        answer['potentialSavings'] = 0
        answer['optimalMemory'] = answer['provisionedMemoryMB']
    print(f"Analysis for {lambda_name}: {answer}")
    return answer


def run_cloudwatch_query(log_group_name, start_datetime, end_datetime, memory_size, storage_size, architecture):
    gb_second_memory_price = '0.0000133334' if architecture == 'arm64' else '0.0000166667'
    gb_second_storage_price = '0.0000000309'
    query = f"""
    fields @timestamp, @message 
    | parse @message "Process exited before completing request" as memory_exceeded
    | parse @message "Task timed out after *" as timeout_number 
    | parse @message "REPORT RequestId: *" as REPORT
    | stats   count(timeout_number) as timeoutInvocations,
    count(REPORT) as countInvocations,
    count(memory_exceeded) as memoryExceededInvocation,
    0.20 / 1000000 as singleInvocationCost,
    {gb_second_memory_price} as GBSecondMemoryPrice,
    {gb_second_storage_price} as GBSecondStoragePrice,
    {storage_size - 512} as StorageSizeMB,
    sum(@billedDuration) / 1000 as allDurationInSeconds,
    {memory_size} as provisionedMemoryMB,

    allDurationInSeconds * provisionedMemoryMB / 1024 as GbSecondsMemoryConsumed,
    allDurationInSeconds * StorageSizeMB / 1024 as GbSecondsStorageConsumed,

    GbSecondsMemoryConsumed *  GBSecondMemoryPrice as MemoryCost,
    GbSecondsStorageConsumed *  GBSecondStoragePrice as StorageCost,
    countInvocations * singleInvocationCost as InvocationCost,
    
    MemoryCost + InvocationCost +  StorageCost as totalCost,
    
    max(@maxMemoryUsed  / 1024 / 1024) as maxMemoryUsedMB,
    provisionedMemoryMB - maxMemoryUsedMB as overProvisionedMB,
    greatest(maxMemoryUsedMB * 1.2, 128) as optimalMemory, 
    allDurationInSeconds * optimalMemory * GBSecondMemoryPrice / 1024 as optimalTotalCost,
    totalCost - optimalTotalCost as potentialSavings,
    
    totalCost / countInvocations as avgCostPerInvocation,
    allDurationInSeconds / countInvocations as avgDurationPerInvocation
 """
    query_id = cloudwatch_client.start_query(
        logGroupName=log_group_name,
        startTime=int(start_datetime.timestamp()),
        endTime=int(end_datetime.timestamp()),
        queryString=query,
    )["queryId"]

    response = None
    while response == None or response["status"] == "Running":
        response = cloudwatch_client.get_query_results(queryId=query_id)
        if response["status"] == "Complete":
            break
        time.sleep(1)
    return response["results"]


def check_log_group_exist(log_group_name):
    log_groups = cloudwatch_client.describe_log_groups(logGroupNamePrefix=log_group_name)
    for log_group in log_groups["logGroups"]:
        if log_group["logGroupName"] == log_group_name:
            return True
    return False


def generate_cost_report(lambda_list, report_id, start_date, end_date):
    lambda_costs = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(get_lambda_cost, l, start_date, end_date): l for l in lambda_list}
        for future in concurrent.futures.as_completed(futures):
            lambda_costs.append(future.result())
    lambda_costs = [item for item in lambda_costs if item is not None]
    # print(lambda_costs)
    csv_buffer = StringIO()

    fieldnames = ["functionName",
                  "runtime",
                  "architecture",
                  "allDurationInSeconds",
                  "provisionedMemoryMB",
                  "MemoryCost",
                  "InvocationCost",
                  "StorageCost",
                  "totalCost",
                  "avgCostPerInvocation",
                  "maxMemoryUsedMB",
                  "overProvisionedMB",
                  "optimalMemory",
                  "optimalTotalCost",
                  "potentialSavings",
                  "avgDurationPerInvocation",
                  "timeoutInvocations",
                  "memoryExceededInvocation",
                  ]
    # with open(output_file, "w", newline="") as csvfile:
    writer = csv.DictWriter(csv_buffer, fieldnames=fieldnames, extrasaction='ignore')
    writer.writeheader()

    for cost_data in lambda_costs:
        writer.writerow(cost_data)
    filename = f"{str(uuid.uuid4())}.csv"
    directory = f"single_analysis/{report_id}"
    upload_file_to_s3(body=csv_buffer.getvalue(), bucket_name=bucket_name, file_name=filename, directory=directory)
    return {"filename": filename, "bucket": bucket_name, "directory": directory, 'report_id': report_id,
            "start_date": start_date, "end_date": end_date}


if __name__ == "__main__":
    # lambda_list = json.load(open('functions_details.json', 'r'))
    # lambda_functions_list = lambda_list['Functions']
    # generate_cost_report(lambda_functions_list[:10])
    event = {
        "end_date": "2024-05-31T22:59:59.999Z",
        "lambda_functions_name": {
            "filename": "params2.json",
            "bucket": "stepfunctionanalysisstack-analysisbucketd8638f5f-igu0ioxhmx9k",
            "directory": "SF_PARAMS/SF_PARAMS2024-05-31-00:44:36"
        },
        "report_id": 1717116275,
        "start_date": "2024-05-23T23:00:00.000Z"
    }

    lambda_handler(event, None)
    # lambda_name = "StepFunctionAnalysisStack-analysisaggregatorCBF0F7-75l8AneOMA96"

    # arn_lambda_lists = ["serverless-ml-GroupForecastFunction-hmXiCccBJGiP",
    #                     "telemetry-daily-Insights-W-EfficiencyScoreFunction-7s1uoiVbOCyG",
    #                     "wattwatchers_get_telemetry",
    #                     "telemetry-daily-InsightStreamFunction-4PcyCebTyDBg",
    #                     "shifted-dispatch-CheckForDeviceTOUDispatch-HKRtUoMwUI07"]
    # generate_cost_report(arn_lambda_lists)
