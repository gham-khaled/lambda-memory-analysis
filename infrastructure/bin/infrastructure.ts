#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {ReportApiStack} from '../lib/report-api-stack';
import {StepFunctionAnalysisStack} from "../lib/step-function-analysis-stack";

const app = new cdk.App();
const envDev = {account: '068008800301', region: 'eu-west-1'}
const sfAnalysisStack = new StepFunctionAnalysisStack(app, 'StepFunctionAnalysisStack', {env: envDev});
new ReportApiStack(app, 'ReportApiStack', {env: envDev}, sfAnalysisStack.analysisStepFunction, sfAnalysisStack.analysisBucket);
