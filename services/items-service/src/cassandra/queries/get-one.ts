import { query } from '../utils'

export default async (id: string) => {
  const res = await query(`SELECT * FROM garagesale.items WHERE id = '${id}'`)
  return res[0]
}
