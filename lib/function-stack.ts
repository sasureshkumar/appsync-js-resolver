import {Stack, StackProps,} from 'aws-cdk-lib'
import {Construct} from 'constructs'
import {Asset} from "aws-cdk-lib/aws-s3-assets";
import {GraphqlApi,} from '@aws-cdk/aws-appsync-alpha'
import {CfnFunctionConfiguration, CfnResolver,} from 'aws-cdk-lib/aws-appsync'

interface FunctionStackProps extends StackProps {
    codePath: string;
    runtime: CfnResolver.AppSyncRuntimeProperty;
    api: GraphqlApi;
    dataSourceName: string;
}

export class FunctionStack extends Stack {
    public readonly functionId: string;

    constructor(scope: Construct, id: string, props: FunctionStackProps) {
        super(scope, id, props);
        const fileName = props.codePath.split('/').pop()!.replace('.js', '');
        const functionName = `${fileName.charAt(0).toUpperCase()}${fileName.slice(1)}`;
        const codeName = `${functionName}Code`;

        const code = new Asset(this, codeName, {
            path: props.codePath,
        });

        const functionConfiguration = new CfnFunctionConfiguration(this, `${functionName}Function`, {
            apiId: props.api.apiId,
            name: `${functionName}Function`,
            dataSourceName: props.dataSourceName,
            codeS3Location: code.s3ObjectUrl,
            runtime: props.runtime,
        });

        this.functionId = functionConfiguration.attrFunctionId;

    }

}
