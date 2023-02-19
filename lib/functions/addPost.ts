import {util, Context} from '@aws-appsync/utils';
import {DynamoDBPutRequestType} from "./definitions";

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

function dynamodbPutRequest(request: DynamoDBPutRequestType) {
    return {
        operation: 'PutItem',
        key: util.dynamodb.toMapValues(request.key),
        attributeValues: util.dynamodb.toMapValues(request.values),
    };
}
