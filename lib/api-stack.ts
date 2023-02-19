import {Stack, StackProps,} from 'aws-cdk-lib'
import {Construct} from 'constructs'
import {Table} from 'aws-cdk-lib/aws-dynamodb'
import {AuthorizationType, DynamoDbDataSource, FieldLogLevel, GraphqlApi, SchemaFile} from '@aws-cdk/aws-appsync-alpha'
import * as path from "path";

interface APIStackProps extends StackProps {
    postTable: Table
}

export class APIStack extends Stack {
    public readonly api: GraphqlApi
    public readonly postTableDataSource: DynamoDbDataSource

    constructor(scope: Construct, id: string, props: APIStackProps) {
        super(scope, id, props)

        const api = new GraphqlApi(this, 'API', {
            name: 'API',
            schema: SchemaFile.fromAsset(path.join(__dirname, 'graphql/schema.graphql')),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: AuthorizationType.API_KEY,
                }
            },
            logConfig: {
                fieldLogLevel: FieldLogLevel.ALL,
            },
            xrayEnabled: true,
        })

        this.api = api

        this.postTableDataSource = api.addDynamoDbDataSource(
            'PostTableDataSource',
            props.postTable
        )
    }
}
