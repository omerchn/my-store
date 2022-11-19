import * as items from './services/items'
import { ApolloServer, BaseContext } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { loadSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { Resolvers } from '../__generated__/resolvers'

const resolvers: Resolvers = {
  Query: {
    items: async () => await items.getAll(),
    item: async (_, { id }) => await items.getOne(id),
  },
}

const run = async () => {
  const server = new ApolloServer<BaseContext>({
    typeDefs: await loadSchema('schema.graphql', {
      loaders: [new GraphQLFileLoader()],
    }),
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
