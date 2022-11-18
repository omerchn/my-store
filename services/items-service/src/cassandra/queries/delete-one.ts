import { query } from '../utils'
import type { ItemId } from '../../../generated_items-service/items'

export default async (id: string) => {
  await query(`DELETE FROM garagesale.items WHERE id='${id}' IF EXISTS`)
  return { id } as ItemId
}
