import * as grpc from '@grpc/grpc-js'
import * as generated from '../__generated__/items-service/items'
import * as queries from './database/queries'
import { databaseGrpcError } from './lib/stargate-cassandra/utils'

// init server
export const server = new grpc.Server()

// implement RPCs
// ✅ type safe
const itemsServiceImplementation: generated.ItemsServer = {
  async streamAll(call) {
    try {
      ;(await queries.getAll(call.request)).forEach((item) => call.write(item))
      call.end()
    } catch (err) {
      console.error(err)
      call.emit('error', databaseGrpcError)
    }
  },
  async getOne(call, callback) {
    try {
      callback(null, await queries.getOne(call.request))
    } catch (err) {
      console.error(err)
      callback(databaseGrpcError)
    }
  },
  async addOne(call, callback) {
    try {
      callback(null, await queries.addOne(call.request))
    } catch (err) {
      console.error(err)
      callback(databaseGrpcError)
    }
  },
  async deleteOne(call, callback) {
    try {
      callback(null, await queries.deleteOne(call.request))
    } catch (err) {
      console.error(err)
      callback(databaseGrpcError)
    }
  },
  async markBought(call, callback) {
    try {
      callback(null, await queries.markBoughtOne(call.request))
    } catch (err) {
      console.error(err)
      callback(databaseGrpcError)
    }
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
