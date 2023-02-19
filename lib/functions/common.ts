import {DynamoDBPutRequestType} from "./definitions";
import {util} from '@aws-appsync/utils';

export const dynamodbPutRequest = (request: DynamoDBPutRequestType) => {
    return {
        operation: 'PutItem',
        key: util.dynamodb.toMapValues(request.key),
        attributeValues: util.dynamodb.toMapValues(request.values),
    };
}
