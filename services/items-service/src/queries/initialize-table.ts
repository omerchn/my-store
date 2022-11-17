import { query } from '../cassandra/utils'

export default async () => {
  return await query(
    'CREATE TABLE IF NOT EXISTS garagesale.items (id text PRIMARY KEY, name text, description text, price float, isBought Boolean)'
  )
}
