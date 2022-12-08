import { objectType, inputObjectType } from 'nexus'
import { ObjectDefinitionBlock, InputDefinitionBlock } from 'nexus/dist/core'
import {
  Item as ItemInterface,
  ItemId as ItemIdInterface,
  ItemInput as ItemInputInterface,
  FilterBought as FilterBoughtInterface,
} from '../__generated__/items-service/items'

function def<I>(
  t: ObjectDefinitionBlock<any> | InputDefinitionBlock<any>,
  defObj: Record<
    keyof I,
    <FieldName extends string>(name: FieldName, ...params: any) => void
  >
): void {
  for (let key in defObj) {
    defObj[key].bind(t)(key)
  }
}

export const Item = objectType({
  name: 'Item',
  definition(t) {
    def<ItemInterface>(t, {
      id: t.nonNull.string,
      name: t.nonNull.string,
      description: t.nonNull.string,
      price: t.nonNull.float,
      bought: t.nonNull.boolean,
    })
  },
})

export const ItemId = objectType({
  name: 'ItemId',
  definition(t) {
    def<ItemIdInterface>(t, {
      id: t.nonNull.id,
    })
  },
})

export const ItemInput = inputObjectType({
  name: 'ItemInput',
  definition(t) {
    def<ItemInputInterface>(t, {
      name: t.nonNull.string,
      description: t.nonNull.string,
      price: t.nonNull.float,
    })
  },
})

export const FilterBought = inputObjectType({
  name: 'FilterBought',
  definition(t) {
    def<FilterBoughtInterface>(t, {
      bought: t.nonNull.boolean,
    })
  },
})
