import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './graphQL/schema.graphql',
    documents: [],
    generates: {
        './src/types/graphql.ts': {
            plugins: ['typescript']
        },
        './graphQL/types/graphql.ts': {
            plugins: ['typescript']
        },
    }
}

export default config;