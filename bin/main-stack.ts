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
    codePath: 'lib/functions/dist/addPost.js',
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

const getPostFunctionStack = new FunctionStack(app, stackPrefix + 'GetPostFunctionStack', {
    api: apiStack.api,
    runtime: runtime,
    dataSourceName: apiStack.postTableDataSource.name,
    codePath: 'lib/functions/getPost.js',
});

const getPostResolverStack = new ResolverStack(app, stackPrefix + 'GetPostResolverStack', {
    api: apiStack.api,
    defaultCode: defaultCode,
    runtime: runtime,
    typeName: 'Query',
    fieldName: 'getPost',
    resolverName: 'GetPostResolver',
    functions: [getPostFunctionStack.functionId],
});

const updatePostFunctionStack = new FunctionStack(app, stackPrefix + 'UpdatePostFunctionStack', {
    api: apiStack.api,
    runtime: runtime,
    dataSourceName: apiStack.postTableDataSource.name,
    codePath: 'lib/functions/updatePost.js',
});

const updatePostResolverStack = new ResolverStack(app, stackPrefix + 'UpdatePostResolverStack', {
    api: apiStack.api,
    defaultCode: defaultCode,
    runtime: runtime,
    typeName: 'Mutation',
    fieldName: 'updatePost',
    resolverName: 'UpdatePostResolver',
    functions: [updatePostFunctionStack.functionId],
});

const voteFunctionStack = new FunctionStack(app, stackPrefix + 'VoteFunctionStack', {
    api: apiStack.api,
    runtime: runtime,
    dataSourceName: apiStack.postTableDataSource.name,
    codePath: 'lib/functions/vote.js',
});

const voteResolverStack = new ResolverStack(app, stackPrefix + 'VoteResolverStack', {
    api: apiStack.api,
    defaultCode: defaultCode,
    runtime: runtime,
    typeName: 'Mutation',
    fieldName: 'vote',
    resolverName: 'VoteResolver',
    functions: [voteFunctionStack.functionId],
});

const deletePostFunctionStack = new FunctionStack(app, stackPrefix + 'DeletePostFunctionStack', {
    api: apiStack.api,
    runtime: runtime,
    dataSourceName: apiStack.postTableDataSource.name,
    codePath: 'lib/functions/deletePost.js',
});

const deletePostResolverStack = new ResolverStack(app, stackPrefix + 'DeletePostResolverStack', {
    api: apiStack.api,
    defaultCode: defaultCode,
    runtime: runtime,
    typeName: 'Mutation',
    fieldName: 'deletePost',
    resolverName: 'DeletePostResolver',
    functions: [deletePostFunctionStack.functionId],
});

const allPostsFunctionStack = new FunctionStack(app, stackPrefix + 'AllPostsFunctionStack', {
    api: apiStack.api,
    runtime: runtime,
    dataSourceName: apiStack.postTableDataSource.name,
    codePath: 'lib/functions/allPosts.js',
});

const allPostsResolverStack = new ResolverStack(app, stackPrefix + 'AllPostsResolverStack', {
    api: apiStack.api,
    defaultCode: defaultCode,
    runtime: runtime,
    typeName: 'Query',
    fieldName: 'allPosts',
    resolverName: 'AllPostsResolver',
    functions: [allPostsFunctionStack.functionId],
});

const allPostsByAuthorFunctionStack = new FunctionStack(app, stackPrefix + 'AllPostsByAuthorFunctionStack', {
    api: apiStack.api,
    runtime: runtime,
    dataSourceName: apiStack.postTableDataSource.name,
    codePath: 'lib/functions/allPostsByAuthor.js',
});

const allPostsByAuthorResolverStack = new ResolverStack(app, stackPrefix + 'AllPostsByAuthorResolverStack', {
    api: apiStack.api,
    defaultCode: defaultCode,
    runtime: runtime,
    typeName: 'Query',
    fieldName: 'allPostsByAuthor',
    resolverName: 'AllPostsByAuthorResolver',
    functions: [allPostsByAuthorFunctionStack.functionId],
});

const allPostsByTagFunctionStack = new FunctionStack(app, stackPrefix + 'AllPostsByTagFunctionStack', {
    api: apiStack.api,
    runtime: runtime,
    dataSourceName: apiStack.postTableDataSource.name,
    codePath: 'lib/functions/allPostsByTag.js',
});

const allPostsByTagResolverStack = new ResolverStack(app, stackPrefix + 'AllPostsByTagResolverStack', {
    api: apiStack.api,
    defaultCode: defaultCode,
    runtime: runtime,
    typeName: 'Query',
    fieldName: 'allPostsByTag',
    resolverName: 'AllPostsByTagResolver',
    functions: [allPostsByTagFunctionStack.functionId],
});

const addTagFunctionStack = new FunctionStack(app, stackPrefix + 'AddTagFunctionStack', {
    api: apiStack.api,
    runtime: runtime,
    dataSourceName: apiStack.postTableDataSource.name,
    codePath: 'lib/functions/addTag.js',
});

const addTagResolverStack = new ResolverStack(app, stackPrefix + 'AddTagResolverStack', {
    api: apiStack.api,
    defaultCode: defaultCode,
    runtime: runtime,
    typeName: 'Mutation',
    fieldName: 'addTag',
    resolverName: 'AddTagResolver',
    functions: [addTagFunctionStack.functionId],
});

const removeTagFunctionStack = new FunctionStack(app, stackPrefix + 'RemoveTagFunctionStack', {
    api: apiStack.api,
    runtime: runtime,
    dataSourceName: apiStack.postTableDataSource.name,
    codePath: 'lib/functions/removeTag.js',
});

const removeTagResolverStack = new ResolverStack(app, stackPrefix + 'RemoveTagResolverStack', {
    api: apiStack.api,
    defaultCode: defaultCode,
    runtime: runtime,
    typeName: 'Mutation',
    fieldName: 'removeTag',
    resolverName: 'RemoveTagResolver',
    functions: [removeTagFunctionStack.functionId],
});
