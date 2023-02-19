import {Context, util} from '@aws-appsync/utils';

export function request(ctx: Context) {
    const {limit = 20, nextToken, tag} = ctx.arguments;
    const filter = JSON.parse(
        util.transform.toDynamoDBFilterExpression({
            tags: {
                contains: tag,
            },
        })
    );
    return {operation: 'Scan', limit, filter, nextToken};
}

export function response(ctx: Context) {
    const {items: posts = [], nextToken} = ctx.result;
    return {posts, nextToken};
}
