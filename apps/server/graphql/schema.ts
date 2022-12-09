import path from 'path'
import { objectType, arg, nonNull, idArg, makeSchema } from 'nexus'
import { FilterBought, Item, ItemId, ItemInput } from './types'
import * as items from '../src/services/items'

export const schema = makeSchema({
  types: [
    objectType({
      name: 'Query',
      definition(t) {
        t.nonNull.list.nonNull.field('items', {
          type: Item,
          args: {
            filterBought: arg({ type: FilterBought }),
          },
          async resolve(_, { filterBought }) {
            return await items.getAll(filterBought || {})
          },
        })
        t.field('item', {
          type: Item,
          args: {
            id: nonNull(idArg()),
          },
          async resolve(_, { id }) {
            return await items.getOne(id)
          },
        })
      },
    }),

    objectType({
      name: 'Mutation',
      definition(t) {
        t.nonNull.field('addItem', {
          type: Item,
          args: {
            item: arg({ type: nonNull(ItemInput) }),
          },
          async resolve(_, { item }) {
            return await items.addOne(item)
          },
        })
        t.nonNull.field('deleteItem', {
          type: ItemId,
          args: {
            id: nonNull(idArg()),
          },
          async resolve(_, { id }) {
            return await items.deleteOne(id)
          },
        })
        t.nonNull.field('markBought', {
          type: ItemId,
          args: {
            id: nonNull(idArg()),
          },
          async resolve(_, { id }) {
            return await items.markBought(id)
          },
        })
      },
    }),
  ],

  outputs: {
    typegen: path.join(__dirname, '__generated__', 'nexus-typegen.ts'),
    schema: path.join(__dirname, '__generated__', 'schema.graphql'),
  },
})
