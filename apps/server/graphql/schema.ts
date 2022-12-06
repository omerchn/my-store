import path from 'path'
import {
  objectType,
  arg,
  nonNull,
  idArg,
  inputObjectType,
  makeSchema,
} from 'nexus'
import * as items from '../src/services/items'
import {
  Item as ItemInterface,
  ItemId as ItemIdInterface,
  ItemInput as ItemInputInterface,
  FilterBought as FilterBoughtInterface,
} from '../__generated__/items-service/items'

function keyIn<I>(key: keyof I) {
  return key
}

const Item = objectType({
  name: 'Item',
  definition(t) {
    t.id(keyIn<ItemInterface>('id'))
    t.string(keyIn<ItemInterface>('name'))
    t.string(keyIn<ItemInterface>('description'))
    t.float(keyIn<ItemInterface>('price'))
    t.boolean(keyIn<ItemInterface>('bought'))
  },
})

const ItemId = objectType({
  name: 'ItemId',
  definition(t) {
    t.id(keyIn<ItemIdInterface>('id'))
  },
})

const FilterBought = inputObjectType({
  name: 'FilterBought',
  definition(t) {
    t.nonNull.id(keyIn<FilterBoughtInterface>('bought'))
  },
})

const ItemInput = inputObjectType({
  name: 'ItemInput',
  definition(t) {
    t.nonNull.string(keyIn<ItemInputInterface>('name'))
    t.nonNull.string(keyIn<ItemInputInterface>('description'))
    t.nonNull.float(keyIn<ItemInputInterface>('price'))
  },
})

const Mutation = objectType({
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
})

const Query = objectType({
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
})

export const schema = makeSchema({
  types: [Item, ItemId, Mutation, Query, FilterBought, ItemInput],
  sourceTypes: {
    modules: [
      {
        module: path.join(
          __dirname,
          '..',
          '__generated__/items-service/items.ts'
        ),
        alias: 'items',
      },
    ],
  },
  outputs: {
    typegen: path.join(__dirname, 'nexus-typegen.ts'),
    schema: path.join(__dirname, 'nexus-schema.graphql'),
  },
})
