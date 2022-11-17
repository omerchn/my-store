import { query } from '../cassandra/utils'

export default async () => {
  return await query(
    `CREATE KEYSPACE IF NOT EXISTS garagesale  WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1}`
  )
}
