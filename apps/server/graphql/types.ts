import { objectType, inputObjectType } from 'nexus'
import {
  Item as ItemInterface,
  ItemId as ItemIdInterface,
  ItemInput as ItemInputInterface,
  FilterBought as FilterBoughtInterface,
} from '../__generated__/items-service/items'

function keyIn<I>(key: keyof I) {
  return key
}

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.id(keyIn<ItemInterface>('id'))
    t.string(keyIn<ItemInterface>('name'))
    t.string(keyIn<ItemInterface>('description'))
    t.float(keyIn<ItemInterface>('price'))
    t.boolean(keyIn<ItemInterface>('bought'))
  },
})

export const ItemId = objectType({
  name: 'ItemId',
  definition(t) {
    t.id(keyIn<ItemIdInterface>('id'))
  },
})

export const ItemInput = inputObjectType({
  name: 'ItemInput',
  definition(t) {
    t.nonNull.string(keyIn<ItemInputInterface>('name'))
    t.nonNull.string(keyIn<ItemInputInterface>('description'))
    t.nonNull.float(keyIn<ItemInputInterface>('price'))
  },
})

export const FilterBought = inputObjectType({
  name: 'FilterBought',
  definition(t) {
    t.nonNull.boolean(keyIn<FilterBoughtInterface>('bought'))
  },
})
