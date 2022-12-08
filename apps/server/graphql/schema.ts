import path from 'path'
import { objectType, arg, nonNull, idArg, makeSchema } from 'nexus'
import { filterBought, item, itemId, itemInput } from './types'
import * as items from '../src/services/items'

export const schema = makeSchema({
  types: [
    objectType({
      name: 'Query',
      definition(t) {
        t.nonNull.list.nonNull.field('items', {
          type: item,
          args: {
            filterBought: arg({ type: filterBought }),
          },
          async resolve(_, { filterBought }) {
            return await items.getAll(filterBought || {})
          },
        })
        t.field('item', {
          type: item,
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
          type: item,
          args: {
            item: arg({ type: nonNull(itemInput) }),
          },
          async resolve(_, { item }) {
            return await items.addOne(item)
          },
        })
        t.nonNull.field('deleteItem', {
          type: itemId,
          args: {
            id: nonNull(idArg()),
          },
          async resolve(_, { id }) {
            return await items.deleteOne(id)
          },
        })
        t.nonNull.field('markBought', {
          type: itemId,
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
    typegen: path.join(__dirname, 'nexus-typegen.ts'),
    schema: path.join(__dirname, 'schema.graphql'),
  },
})
