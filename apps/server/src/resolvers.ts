import * as items from './services/items'
import * as generated from '../__generated__/resolvers'

export const resolvers: generated.Resolvers = {
  Query: {
    items: async (_, { filterBought }) => await items.getAll(filterBought || {}),
    item: async (_, { id }) => await items.getOne(id),
  },
  Mutation: {
    addItem: async (_, { item }) => await items.addOne(item),
    deleteItem: async (_, { id }) => await items.deleteOne(id),
    markBought: async (_, { id }) => await items.markBought(id),
  },
}
