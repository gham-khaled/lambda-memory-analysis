import boto3
import json

client = boto3.client('lambda')
headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,GET,PUT,POST,DELETE'
}


# TODO: Add Filter logic and put the lambda fetch in the execution context
# TODO: Add more information in the response body
def lambda_handler(event, context):
    print(event)
    parameters = event['queryStringParameters']
    selected_runtimes = parameters['selectedRuntime']
    selected_package_type = parameters['selectedPackageType']
    selected_architecture = parameters['selectedArchitecture']

    response = client.list_functions()
    functions = []
    print(response['Functions'])
    for function in response['Functions']:
        print(function['Architectures'][0])
        filter_architecture = function['Architectures'][0] in selected_architecture
        filter_runtime = function['Runtime'] in selected_runtimes
        filter_package_type = function['PackageType'] in selected_package_type

        print(
            f"filter_architecture {filter_architecture}, filter_runtime {filter_runtime}, filter_package_type {filter_package_type}")
        if all([filter_architecture, filter_runtime, filter_package_type]):
            functions.append({
                'FunctionName': function['FunctionName'],
                'Runtime': function['Runtime'],
                'PackageType': function['PackageType'],
                'Architectures': function['Architectures'],
                'MemorySize': function['MemorySize'],
                'LastModified': function['LastModified']
            })
    # json.dump(functions, open('functions_details.json', 'w'))

    return {
        'statusCode': 200,
        'body': json.dumps(functions),
        'headers': headers
    }


if __name__ == '__main__':
    print(lambda_handler(None, None))
