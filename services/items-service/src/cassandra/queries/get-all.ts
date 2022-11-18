import { query } from '../utils'
import type { Item } from '../../../generated_items-service/items'

export default async () => {
  const res = await query('SELECT * FROM garagesale.items')
  return res as Array<Item>
}
