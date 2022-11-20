import * as items from './services/items'
import { Resolvers } from '../__generated__/resolvers'

export const resolvers: Resolvers = {
  Query: {
    items: async () => await items.getAll(),
    item: async (_, { id }) => await items.getOne(id),
  },
  Mutation: {
    addItem: async (_, { item }) => await items.addOne(item),
    deleteItem: async (_, { id }) => await items.deleteOne(id),
  },
}
