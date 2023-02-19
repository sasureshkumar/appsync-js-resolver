import {RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import {AttributeType, BillingMode, ProjectionType, StreamViewType, Table} from 'aws-cdk-lib/aws-dynamodb'
import {Construct} from 'constructs';

interface DatabaseStackProps extends StackProps {
}

export class DatabaseStack extends Stack {
    public readonly postTable: Table

    constructor(scope: Construct, id: string, props?: DatabaseStackProps) {
        super(scope, id, props)

        const postTable = new Table(this, 'PostTable', {
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: {name: 'id', type: AttributeType.STRING},
            stream: StreamViewType.NEW_AND_OLD_IMAGES,
            pointInTimeRecovery: true,
        })

        postTable.addGlobalSecondaryIndex({
            indexName: 'author-index',
            partitionKey: {name: 'author', type: AttributeType.STRING},
            projectionType: ProjectionType.ALL,
        });

        this.postTable = postTable;

    }

}
