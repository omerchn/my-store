import { query } from '../cassandra/utils'

export default async () => {
  return await query('SELECT * FROM garagesale.items')
}
