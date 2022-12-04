import * as grpc from '@grpc/grpc-js'
import * as generated from '../__generated__/items-service/items'
import * as queries from './stargate-cassandra/queries'

// init server
export const server = new grpc.Server()

// items service implementation
const itemsServiceImplementation: generated.ItemsServer = {
  async streamAll(call) {
    ;(await queries.getAll(call.request)).forEach((item) => call.write(item))
    call.end()
  },
  async getOne(call, callback) {
    callback(null, await queries.getOne(call.request))
  },
  async addOne(call, callback) {
    callback(null, await queries.addOne(call.request))
  },
  async deleteOne(call, callback) {
    callback(null, await queries.deleteOne(call.request))
  },
  async markBought(call, callback) {
    callback(null, await queries.markBoughtOne(call.request))
  },
}
server.addService(generated.ItemsService, itemsServiceImplementation)

// start server
const port = 5000
server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) {
      console.log('❌ Error Starting Items Service', err)
    } else {
      server.start()
      console.log(`✅ Items Service Started (port ${port})`)
    }
  }
)
