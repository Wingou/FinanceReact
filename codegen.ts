import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './graphQL/schema.graphql',
    // documents: ['./src/**/*.graphql', './src/**/*.gql', './src/**/*.tsx'],
    documents: [],
    generates: {
        './src/types/graphql.ts': {
            plugins: ['typescript']
        },
        // './src/types/graphql-resolvers.ts': {
        //     plugins: ['typescript-resolvers'],
        //     // config: {
        //     //     contextType: './src/graphQLcontext#GraphQLContext',
        //     //     mappers: {
        //     //     }
        //     // }
        // },
        // './src/graphql/generated/graphql.ts': {
        //     preset: 'client',
        //     plugins: ['typescript', 'typescript-operations', 'type-document-node'],
        // }
    }
}

export default config;