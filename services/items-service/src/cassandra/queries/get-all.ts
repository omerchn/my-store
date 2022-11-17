import { query } from '../utils'

export default async () => {
  return await query('SELECT * FROM garagesale.items')
}
