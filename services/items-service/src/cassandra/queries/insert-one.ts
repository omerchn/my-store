import { query } from '../utils'
import { v4 as uuid } from 'uuid'
import type {
  Item,
  ItemInput,
} from '../../../__generated__/items-service/items'

export default async (data: ItemInput) => {
  const item: Item = {
    id: uuid(),
    bought: false,
    ...data,
  }
  await query(
    `INSERT INTO garagesale.items (id, name, description, price, bought) VALUES ('${item.id}', '${item.name}', '${item.description}', ${item.price}, ${item.bought})`
  )
  return item as Item
}
