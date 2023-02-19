#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {CfnResolver} from "aws-cdk-lib/aws-appsync";
import {DatabaseStack} from '../lib/database-stack';
import {APIStack} from "../lib/api-stack";
import {FunctionStack} from "../lib/function-stack";
import {ResolverStack} from "../lib/resolver-stack";

const defaultCode =
    `
            import {util} from '@aws-appsync/utils';
            export function request(ctx) {
                return {};
            }
            export function response(ctx) {
                return ctx.prev.result;
            }
        ` as string;

const runtime = {
    'name': 'APPSYNC_JS',
    'runtimeVersion': '1.0.0',
} as CfnResolver.AppSyncRuntimeProperty;

const stackPrefix = 'TestStack';
const app = new cdk.App();

const databaseStack = new DatabaseStack(app, stackPrefix + 'DatabaseStack', {});

const apiStack = new APIStack(app, stackPrefix + 'APIStack', {
    postTable: databaseStack.postTable,
});

const addPostFunctionStack = new FunctionStack(app, stackPrefix + 'AddPostFunctionStack', {
    api: apiStack.api,
    runtime: runtime,
    dataSourceName: apiStack.postTableDataSource.name,
    codePath: 'lib/functions/addPost.js',
});

const addPostResolverStack = new ResolverStack(app, stackPrefix + 'AddPostResolverStack', {
    api: apiStack.api,
    defaultCode: defaultCode,
    runtime: runtime,
    typeName: 'Mutation',
    fieldName: 'addPost',
    resolverName: 'AddPostResolver',
    functions: [addPostFunctionStack.functionId],
});
