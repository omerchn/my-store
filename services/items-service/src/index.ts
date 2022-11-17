import { getAll, getOne, insertOne } from './queries'

async function start() {
  console.log('✅ Started')

  // console.log(await getOne('f345gs'))
  // console.log(
  //   await insertOne({
  //     name: 'wow',
  //     description: 'wow',
  //     isBought: true,
  //     price: 2,
  //   })
  // )
  // console.log(await getAll())
}

start()
