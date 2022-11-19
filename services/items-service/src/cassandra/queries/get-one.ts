import { query } from '../utils'
import type { Item } from '../../../__generated__/items-service/items'

export default async (id: string) => {
  const res = await query(`SELECT * FROM garagesale.items WHERE id='${id}'`)
  return res[0] as Item
}
