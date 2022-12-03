import { query } from '../utils'
import type {
  Item,
  FilterBought,
} from '../../../__generated__/items-service/items'

export default async (filterBought: FilterBought) => {
  const res = await query(
    'SELECT * FROM garagesale.items' +
      (filterBought.bought !== undefined
        ? ` WHERE bought = ${filterBought.bought}`
        : '')
  )
  return res as Array<Item>
}
