import {Stack, StackProps,} from 'aws-cdk-lib'
import {Construct} from 'constructs'
import {GraphqlApi,} from '@aws-cdk/aws-appsync-alpha'
import {CfnResolver,} from 'aws-cdk-lib/aws-appsync'

interface ResolverStackProps extends StackProps {
    resolverName: string;
    typeName: string;
    fieldName: string;
    runtime: CfnResolver.AppSyncRuntimeProperty;
    defaultCode: string;
    api: GraphqlApi;
    functions: string[];
}

export class ResolverStack extends Stack {
    constructor(scope: Construct, id: string, props: ResolverStackProps) {
        super(scope, id, props);

        const resolver = new CfnResolver(this, props.resolverName, {
            apiId: props.api.apiId,
            typeName: props.typeName,
            fieldName: props.fieldName,
            pipelineConfig: {
                functions: props.functions,
            },
            kind: 'PIPELINE',
            code: props.defaultCode,
            runtime: props.runtime,
        });

    }

}
