import { startStandaloneServer } from '@apollo/server/standalone'
import { ApolloServer } from '@apollo/server'
import { schema } from '../graphql/schema'
import { logServiceConnection as logItemsServiceConnection } from './services/items'

const server = new ApolloServer({ schema })

startStandaloneServer(server, {
  listen: { port: 4000 },
})
  .then(({ url }) => {
    console.log(`✅ GraphQL Server Started (${url})`)
  })
  .catch((err) => {
    console.log('❌ Error Starting GraphQL Server', err)
  })

logItemsServiceConnection()
