import path from 'path'
import Mali from 'mali'
import stream from 'stream'
import * as queries from './database/queries'

// init server
const PROTO_PATH = path.resolve(__dirname, '../proto/items.proto')
const app = new Mali(PROTO_PATH, 'Items')

// implement RPCs
// ❌ not type safe
app.use({
  streamAll: async (ctx: Mali.Context<any>) => {
    const rStream = new stream.Readable({ objectMode: true })
    const items = await queries.getAll(ctx.req)
    items.forEach((item) => rStream.push(item))
    rStream.push(null)
    ctx.res = rStream
  },
  getOne: async (ctx: Mali.Context<any>) => {
    ctx.res = await queries.getOne(ctx.req)
  },
  addOne: async (ctx: Mali.Context<any>) => {
    ctx.res = await queries.addOne(ctx.req)
  },
  deleteOne: async (ctx: Mali.Context<any>) => {
    ctx.res = await queries.deleteOne(ctx.req)
  },
  markBought: async (ctx: Mali.Context<any>) => {
    ctx.res = await queries.markBoughtOne(ctx.req)
  },
})

// start server
const port = 5000
app
  .start(`0.0.0.0:${port}`)
  .then(() => {
    console.log(`✅ Items Service Started (port ${port})`)
  })
  .catch((err) => {
    console.log('❌ Error Starting Items Service', err)
  })
