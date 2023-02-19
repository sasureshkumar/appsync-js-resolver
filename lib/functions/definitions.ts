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

export type DynamoDBPutRequestType = {
    key: {
        id: string,
    },
    values: PostType,
}
