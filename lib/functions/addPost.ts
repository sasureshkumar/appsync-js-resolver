import {Context} from '@aws-appsync/utils';
import {dynamodbPutRequest} from "./common";

export function request(ctx: Context) {
    const {id, ...values} = ctx.arguments;
    values.ups = 1;
    values.downs = 0;
    values.version = 1;
    return dynamodbPutRequest({key: {id}, values});
}

export function response(ctx: Context) {
    return ctx.result;
}
