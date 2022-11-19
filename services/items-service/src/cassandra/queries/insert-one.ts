import { query } from '../utils'
import { v4 as uuid } from 'uuid'
import type { Item, ItemNoId } from '../../../__generated__/items-service/items'

export default async (data: ItemNoId) => {
  try {
    const item = {
      id: uuid(),
      ...data,
    }
    await query(
      `INSERT INTO garagesale.items (id, name, description, price, isBought) VALUES ('${item.id}', '${item.name}', '${item.description}', ${item.price}, ${item.isBought})`
    )
    return item as Item
  } catch (err) {
    console.log(1)
  }
}
