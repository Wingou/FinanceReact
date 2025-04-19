import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { resolvers } from './resolvers.js'
import { schema } from './schema.js'
import cors from 'cors'; 


const app = express()

app.use(cors({ origin: 'http://localhost:3001' })) 

app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      rootValue: resolvers.Query, 
      graphiql: true,
    })
  )

app.listen(4000, () => {
  console.log('Listening on http://localhost:4000/graphql')
})
