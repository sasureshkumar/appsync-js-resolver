import {Context, util} from '@aws-appsync/utils';
import {DynamoDBDeleteItemRequest} from "@aws-appsync/utils/lib/resolver-return-types";

export function request(ctx: Context) {
    const {id, expectedVersion} = ctx.arguments;

    const request: DynamoDBDeleteItemRequest = {
        operation: 'DeleteItem',
        key: util.dynamodb.toMapValues({id}),
    };

    if (expectedVersion) {
        request.condition = JSON.parse(
            util.transform.toDynamoDBConditionExpression({
                or: [
                    {id: {attributeExists: false}},
                    {version: {eq: expectedVersion}},
                ],
            })
        );
    }

    return request;
}

export function response(ctx: Context) {
    const {error, result} = ctx;
    if (error) {
        util.appendError(error.message, error.type);
    }
    return result;
}
