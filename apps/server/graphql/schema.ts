import path from 'path'
import { objectType, arg, nonNull, makeSchema } from 'nexus'
import { FilterBought, Item, ItemId, ItemInput } from './types'
import * as items from '../src/services/items'

import Stripe from 'stripe'
const stripe = new Stripe(
  'sk_test_51MFvisCrYW49QcGkudItIPzVCVZLhCDY4F8cjybxq6Wj6BQM3YOI7pJtxixdpjiRJqp7bWyA7QFRll3MNClQzL5c00skNPaIqH',
  {
    apiVersion: '2022-11-15',
  }
)

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
            id: nonNull('ID'),
          },
          async resolve(_, { id }) {
            return await items.getOne(id)
          },
        })
        t.nonNull.field('paymentIntent', {
          type: objectType({
            name: 'ClientSecret',
            definition(t) {
              t.nonNull.string('clientSecret')
            },
          }),
          args: {
            price: nonNull('Int'),
          },
          async resolve(_, { price }) {
            const intent = await stripe.paymentIntents.create({
              amount: price * 100,
              currency: 'usd',
            })
            if (!intent.client_secret) throw 'Something went wrong'
            return { clientSecret: intent.client_secret }
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
            id: nonNull('ID'),
          },
          async resolve(_, { id }) {
            return await items.deleteOne(id)
          },
        })
        t.nonNull.field('markBought', {
          type: ItemId,
          args: {
            id: nonNull('ID'),
          },
          async resolve(_, { id }) {
            return await items.markBought(id)
          },
        })
      },
    }),
  ],

  outputs: {
    typegen: path.join(__dirname, '../__generated__/graphql/nexus-typegen.ts'),
    schema: path.join(__dirname, '../__generated__/graphql/schema.graphql'),
  },
})
