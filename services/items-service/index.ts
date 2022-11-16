import { executeQuery } from './cassandra'

async function start() {
  console.log('✅ Started')
  console.log(
    // await executeQuery(
    //   'CREATE TABLE IF NOT EXISTS garagesale.items (id text PRIMARY KEY, name text, description text, price float, isBought Boolean);'
    // )
    await executeQuery('SELECT * FROM garagesale.items')
  )
  // console.log('✅ Connected to DB')
}

start()
