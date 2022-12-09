import { objectType, inputObjectType } from 'nexus'
import { def } from './nexus-utils'
import {
  Item as ItemType,
  ItemId as ItemIdType,
  ItemInput as ItemInputType,
  FilterBought as FilterBoughtType,
} from '../__generated__/items-service/items'

export const Item = objectType({
  name: 'Item',
  definition(t) {
    def<ItemType>(t.nonNull, {
      id: 'id',
      name: 'string',
      description: 'string',
      price: 'float',
      bought: 'boolean',
    })
  },
})

export const ItemId = objectType({
  name: 'ItemId',
  definition(t) {
    def<ItemIdType>(t.nonNull, {
      id: 'id',
    })
  },
})

export const ItemInput = inputObjectType({
  name: 'ItemInput',
  definition(t) {
    def<ItemInputType>(t.nonNull, {
      name: 'string',
      description: 'string',
      price: 'float',
    })
  },
})

export const FilterBought = inputObjectType({
  name: 'FilterBought',
  definition(t) {
    def<FilterBoughtType>(t.nonNull, {
      bought: 'boolean',
    })
  },
})
