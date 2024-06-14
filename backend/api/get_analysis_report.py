import json
import os
from io import StringIO

import boto3
import pandas as pd
from botocore.exceptions import ClientError

from utils.s3_utils import download_from_s3

s3_client = boto3.client('s3')

bucket_name = os.environ['BUCKET_NAME']
headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,GET,PUT,POST,DELETE'
}


def lambda_handler(event, context):
    report_id = event.get('queryStringParameters', {}).get('reportID')

    if not report_id:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Report ID parameter is required'}),
            'headers': headers
        }

    try:
        # Fetch the S3 object
        summary = download_from_s3(file_name='summary.json', bucket_name=bucket_name, directory=report_id)
        analysis = download_from_s3(file_name='analysis.csv', bucket_name=bucket_name, directory=report_id)
        df = pd.read_csv(StringIO(analysis), sep=',', index_col=0)
        return {
            'statusCode': 200,
            'body': json.dumps({'analysis': json.loads(df.to_json(orient="records")), 'summary': json.loads(summary),
                                'status': 'Completed'}),
            'headers': headers
        }
    except ClientError as e:
        if e.response['Error']['Code'] == 'NoSuchKey':
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'Analysis does not exists or have been deleted', 'status': 'Error'}),
                'headers': headers
            }
        else:
            return {
                'statusCode': 500,
                'body': json.dumps({'error': str(e), 'status': 'Error'}),
                'headers': headers
            }


if __name__ == '__main__':
    event = {'queryStringParameters': {'reportID': 'third_report'}}
    result = lambda_handler(event, None)
    print(json.loads(result['body']))
