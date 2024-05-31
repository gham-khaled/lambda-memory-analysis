import json
import os
from datetime import datetime
from io import StringIO, BytesIO

import pandas as pd

from utils.multithread_utils import multi_thread
from utils.s3_utils import download_from_s3, upload_file_to_s3

bucket_name = os.environ['BUCKET_NAME']


def download_csv_file_wrapper(s3_info):
    csv_file_content = download_from_s3(file_name=s3_info['filename'], bucket_name=s3_info['bucket'],
                                        directory=s3_info['directory'])
    return pd.read_csv(StringIO(csv_file_content), sep=',')


def lambda_handler(event, context):
    report_id = event[0]['report_id']
    start_date = event[0]['start_date']
    end_date = event[0]['end_date']
    print(event)
    aggregated_data = pd.DataFrame()
    files_content = multi_thread(download_csv_file_wrapper, event, max_workers=10)
    for content in files_content:
        print(content)
        aggregated_data = pd.concat([aggregated_data, content], ignore_index=False)
    csv_buffer = StringIO()
    aggregated_data.to_csv(csv_buffer)
    upload_file_to_s3(csv_buffer.getvalue(), file_name="analysis.csv", bucket_name=bucket_name, directory=report_id)
    avg_columns_rename = {
        'provisionedMemoryMB': 'avgProvisionedMemoryMB',
        'maxMemoryUsedMB': 'avgMaxMemoryUsedMB',
        'overProvisionedMB': 'avgOverProvisionedMB'
    }

    aggregated_data.rename(columns=avg_columns_rename, inplace=True)
    agg_funcs = {
        'allDurationInSeconds': 'sum',
        'MemoryCost': 'sum',
        'InvocationCost': 'sum',
        'totalCost': 'sum',
        'potentialSavings': 'sum',
        'optimalTotalCost': 'sum',
        'timeoutInvocations': 'sum',
        'memoryExceededInvocation': 'sum',
        'avgCostPerInvocation': 'mean',
        'avgMaxMemoryUsedMB': 'mean',
        'avgOverProvisionedMB': 'mean',
        'avgProvisionedMemoryMB': 'mean',
        'avgDurationPerInvocation': 'mean'
    }
    # Apply the aggregation function
    result = aggregated_data.agg(agg_funcs)

    result['status'] = 'Completed'
    result['reportID'] = report_id
    result['startDate'] = start_date
    result['endDate'] = end_date
    # Convert the result to JSON
    result_json = result.to_json()
    upload_file_to_s3(body=result_json,
                      file_name=f'summary.json',
                      bucket_name=bucket_name,
                      directory=report_id)
    upload_file_to_s3(body=result_json,
                      file_name=f'{datetime.now().timestamp()}_{report_id}.json',
                      bucket_name=bucket_name,
                      directory='summaries')


if __name__ == '__main__':
    event = [
        {
            "filename": "9471ca47-ffde-4c50-a8cc-dbfb4a3b80f2.csv",
            "bucket": "stepfunctionanalysisstack-analysisbucketd8638f5f-igu0ioxhmx9k",
            "directory": "single_analysis/first_report",
            "report_id": "first_report"
        },
        {
            "filename": "6118b7f6-efd6-4171-ab44-847cff73ac58.csv",
            "bucket": "stepfunctionanalysisstack-analysisbucketd8638f5f-igu0ioxhmx9k",
            "directory": "single_analysis/first_report",
            "report_id": "first_report"
        },
        {
            "filename": "6604ee1d-c84e-4a62-aebb-8880a85a1b7f.csv",
            "bucket": "stepfunctionanalysisstack-analysisbucketd8638f5f-igu0ioxhmx9k",
            "directory": "single_analysis/first_report",
            "report_id": "first_report"
        },
        {
            "filename": "a68651b1-0a17-4cd4-8308-bbe77f6a35ea.csv",
            "bucket": "stepfunctionanalysisstack-analysisbucketd8638f5f-igu0ioxhmx9k",
            "directory": "single_analysis/first_report",
            "report_id": "first_report"
        }
    ]
    lambda_handler(event, None)
