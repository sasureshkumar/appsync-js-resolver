import {Context, util} from '@aws-appsync/utils';
import {ExpressionNames, ExpressionValues, UpdatePostRequestType} from "./definitions";

export function request(ctx: Context) {
    const {id, expectedVersion, ...values} = ctx.args;
    const condition = {version: {eq: expectedVersion}};
    return dynamodbUpdateRequest({key: {id}, values, condition});
}

export function response(ctx: Context) {
    const {error, result} = ctx;
    if (error) {
        util.appendError(error.message, error.type);
    }
    return result;
}

function dynamodbUpdateRequest(request: UpdatePostRequestType) {
    const sets = [];
    const removes = [];
    const expressionNames: ExpressionNames = {};
    const expressionValues: ExpressionValues = {};

    for (const [k, value] of Object.entries(request.values)) {
        expressionNames[`#${k}`] = k;
        if (value) {
            sets.push(`#${k} = :${k}`);
            expressionValues[`:${k}`] = value;
        } else {
            removes.push(`#${k}`);
        }
    }

    let expression = sets.length ? `SET ${sets.join(', ')}` : '';
    expression += removes.length ? ` REMOVE ${removes.join(', ')}` : '';

    expressionNames['#version'] = 'version';
    expressionValues[':version'] = 1;
    expression += ' ADD #version :version';

    return {
        operation: 'UpdateItem',
        key: util.dynamodb.toMapValues(request.key),
        update: {
            expression,
            expressionNames,
            expressionValues: util.dynamodb.toMapValues(expressionValues),
        },
        condition: JSON.parse(
            util.transform.toDynamoDBConditionExpression(request.condition)
        ),
    };
}
