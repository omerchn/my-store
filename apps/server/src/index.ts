import { ApolloServer, BaseContext } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { loadSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { resolvers } from './resolvers'

const run = async () => {
  const schema = await loadSchema('schema.graphql', {
    loaders: [new GraphQLFileLoader()],
  })

  const server = new ApolloServer<BaseContext>({
    typeDefs: schema,
    resolvers,
  })

  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    })
    console.log(`✅ GraphQL Server Started (${url})`)
  } catch (err) {
    console.log('❌ Error Starting GraphQL Server', err)
  }
}
run()
