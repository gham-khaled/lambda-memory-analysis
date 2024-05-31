import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {Aws, Duration} from "aws-cdk-lib";
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import {StateMachine} from "aws-cdk-lib/aws-stepfunctions";
import * as iam from 'aws-cdk-lib/aws-iam';
import {Bucket} from "aws-cdk-lib/aws-s3";
import {LambdaIntegration, PassthroughBehavior} from "aws-cdk-lib/aws-apigateway";

export class ReportApiStack extends cdk.Stack {
    // addCorsOptions(apiResource: apigateway.IResource) {
    //     apiResource.addMethod('OPTIONS', new apigateway.MockIntegration({
    //         integrationResponses: [{
    //             statusCode: '200',
    //             responseParameters: {
    //                 'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
    //                 'method.response.header.Access-Control-Allow-Origin': "'*'",
    //                 'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'"
    //             }
    //         }],
    //         passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
    //         requestTemplates: {
    //             'application/json': '{"statusCode": 200}'
    //         }
    //     }), {
    //         methodResponses: [{
    //             statusCode: '200',
    //             responseParameters: {
    //                 'method.response.header.Access-Control-Allow-Headers': true,
    //                 'method.response.header.Access-Control-Allow-Origin': true,
    //                 'method.response.header.Access-Control-Allow-Methods': true
    //             }
    //         }]
    //     });
    // }

    constructor(scope: Construct, id: string, props: cdk.StackProps, analysisStepFunction: StateMachine, analysisBucket: Bucket) {
        super(scope, id, props);

        const list_lambda_functions = new lambda.Function(this, 'list_lambda_functions', {
            runtime: lambda.Runtime.PYTHON_3_10,
            handler: 'api.list_lambda_functions.lambda_handler',
            code: lambda.Code.fromAsset('../backend/'),
            timeout: Duration.seconds(29)
        });
        const listFunctionsPolicy = new iam.PolicyStatement({
            actions: ['lambda:ListFunctions'],
            resources: ['*'],
        });
        list_lambda_functions.addToRolePolicy(listFunctionsPolicy)
        const get_analysis_report = new lambda.Function(this, 'get_analysis_report', {
            runtime: lambda.Runtime.PYTHON_3_10,
            handler: 'api.get_analysis_report.lambda_handler',
            code: lambda.Code.fromAsset('../backend/'),
            timeout: Duration.seconds(29),
            layers: [lambda.LayerVersion.fromLayerVersionArn(this, 'pandasLayer', `arn:aws:lambda:${Aws.REGION}:336392948345:layer:AWSSDKPandas-Python310:15`)],
            environment: {
                BUCKET_NAME: analysisBucket.bucketName
            }

        });
        const historical_analysis_report = new lambda.Function(this, 'historical_analysis_report', {
            runtime: lambda.Runtime.PYTHON_3_10,
            handler: 'api.historical_analysis_report.lambda_handler',
            code: lambda.Code.fromAsset('../backend/'),
            timeout: Duration.seconds(29),
            environment: {
                BUCKET_NAME: analysisBucket.bucketName
            }
        });


        const api = new apigateway.RestApi(this, 'analysisAPI', {
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS, // Allow all methods (GET, POST, etc.)
                allowHeaders: apigateway.Cors.DEFAULT_HEADERS
            }
        });
        api.root.addResource('reportSummaries').addMethod('GET', new apigateway.LambdaIntegration(historical_analysis_report))

        api.root.addResource('lambdaFunctions').addMethod('GET', new apigateway.LambdaIntegration(list_lambda_functions), {
            requestParameters: {
                'method.request.querystring.selectedRuntime': true,
                'method.request.querystring.selectedPackageType': true,
                'method.request.querystring.selectedArchitecture': true
            }
        })
        api.root.addResource('report').addMethod('GET', new apigateway.LambdaIntegration(get_analysis_report), {
            requestParameters: {
                'method.request.querystring.reportID': true,
            }
        })
        // TODO: Add SF integration with API Gateway
        const apiGatewayRole = new iam.Role(this, 'ApiGatewayStepFunctionsRole', {
            assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('AWSStepFunctionsFullAccess'),
            ],
        });

        const startExecutionIntegration = new apigateway.AwsIntegration({
            service: 'states',
            action: 'StartExecution',
            options: {
                credentialsRole: apiGatewayRole,
                requestTemplates: {
                    'application/json': `{
            "input": "$util.escapeJavaScript($input.json('$'))",
            "stateMachineArn": "${analysisStepFunction.stateMachineArn}"
          }`
                },
                integrationResponses: [
                    {
                        responseParameters: {
                            'method.response.header.Access-Control-Allow-Origin': "'*'",
                        },
                        statusCode: '200',
                        responseTemplates: {
                            'application/json': `{
                "executionArn": "$input.path('$.executionArn')",
                "startDate": "$input.path('$.startDate')"
              }`
                        }
                    }
                ]
            }
        });
        const startExecutionResource = api.root.addResource('startExecution');
        startExecutionResource.addMethod('POST', startExecutionIntegration, {
            methodResponses: [
                {
                    statusCode: '200',
                    responseParameters: {
                        'method.response.header.Access-Control-Allow-Origin': true,
                    }
                },

            ]
        });

        analysisBucket.grantRead(historical_analysis_report)
        analysisBucket.grantRead(get_analysis_report)
        // TODO: Add request validation when integrating SF (Example: Lambda ARNs must be a non empty list)
    }
}

