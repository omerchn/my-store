import { objectType, inputObjectType } from 'nexus'
import { def } from './nexus-utils'
import {
  Item,
  ItemId,
  ItemInput,
  FilterBought,
} from '../__generated__/items-service/items'

export const item = objectType({
  name: 'Item',
  definition(t) {
    def<Item>(t.nonNull, {
      id: 'id',
      name: 'string',
      description: 'string',
      price: 'float',
      bought: 'boolean',
    })
  },
})

export const itemId = objectType({
  name: 'ItemId',
  definition(t) {
    def<ItemId>(t.nonNull, {
      id: 'id',
    })
  },
})

export const itemInput = inputObjectType({
  name: 'ItemInput',
  definition(t) {
    def<ItemInput>(t.nonNull, {
      name: 'string',
      description: 'string',
      price: 'float',
    })
  },
})

export const filterBought = inputObjectType({
  name: 'FilterBought',
  definition(t) {
    def<FilterBought>(t.nonNull, {
      bought: 'boolean',
    })
  },
})
