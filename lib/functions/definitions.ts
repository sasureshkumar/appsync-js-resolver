export type PostType = {
    id: string,
    author: string,
    title: string,
    content: string,
    url: string,
    ups: number,
    downs: number,
    version: number,
    tags: string[],
}

export type PostKeyType = {
    id: string,
}

export type DynamoDBPutRequestType = {
    key: PostKeyType,
    values: PostType,
}

export type UpdatePostConditionType = {
    version: {
        eq: number,
    }
}

export type UpdatePostRequestType = DynamoDBPutRequestType & {
    condition: UpdatePostConditionType,
}

export type ExpressionNames = {
    [key: string]: string,
}

export type ExpressionValues = {
    [key: string]: string | number | string[],
}
