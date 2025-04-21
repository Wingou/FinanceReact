import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { resolvers } from './resolvers.js'
import cors from 'cors'; 
import { makeExecutableSchema } from '@graphql-tools/schema';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const typeDefs = await fs.readFile(path.join(__dirname, './schema.graphql'), 'utf-8');
const schema =  makeExecutableSchema({typeDefs, resolvers})

const app = express()
app.use(cors({ origin: 'http://localhost:3001' })) 
app.use(express.json());
app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      rootValue: resolvers, 
      graphiql: true,
    })
  )
app.listen(4000, () => {
  console.log('Listening on http://localhost:4000/graphql')
})
