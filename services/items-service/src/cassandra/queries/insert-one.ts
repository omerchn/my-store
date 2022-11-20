import { query } from '../utils'
import { v4 as uuid } from 'uuid'
import type {
  Item,
  ItemInput,
} from '../../../__generated__/items-service/items'

export default async (data: ItemInput) => {
  try {
    const item: Item = {
      id: uuid(),
      isBought: false,
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
