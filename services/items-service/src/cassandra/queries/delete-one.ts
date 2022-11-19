import { query } from '../utils'
import type { ItemId } from '../../../__generated__/items-service/items'

export default async (id: string) => {
  await query(`DELETE FROM garagesale.items WHERE id='${id}' IF EXISTS`)
  return { id } as ItemId
}
