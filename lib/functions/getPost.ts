import {Context, util} from '@aws-appsync/utils';
import {PostKeyType} from "./definitions";

export function request(ctx: Context) {
    return dynamoDBGetItemRequest(ctx);
}

export function response(ctx: Context) {
    return ctx.result;
}

function dynamoDBGetItemRequest(ctx: Context) {
    return {
        operation: 'GetItem',
        key: util.dynamodb.toMapValues({id: ctx.arguments.id} as PostKeyType),
        projection: {
            expression: ctx.info.selectionSetList.join(",")
        }
    };
}
