#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {ReportApiStack} from '../lib/report-api-stack';
import {StepFunctionAnalysisStack} from "../lib/step-function-analysis-stack";
import {S3WebsiteStack} from "../lib/s3-website-stack";

const app = new cdk.App();
const envDev = {account: '068008800301', region: 'eu-west-1'}
const sfAnalysisStack = new StepFunctionAnalysisStack(app, 'StepFunctionAnalysisStack', {env: envDev});
const reportApiStack = new ReportApiStack(app, 'ReportApiStack', {env: envDev}, sfAnalysisStack.analysisStepFunction, sfAnalysisStack.analysisBucket);
new S3WebsiteStack(app, 'ReportWebsiteStack', {env: envDev}, reportApiStack.api);
