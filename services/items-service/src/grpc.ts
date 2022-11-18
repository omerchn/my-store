import * as grpc from '@grpc/grpc-js'
import { itemsService } from './services/itemsService'
import { ItemsServiceService } from '../generated_items-service/items'

export const server = new grpc.Server()
server.addService(ItemsServiceService, itemsService)

export const startServer = async (port: number) => {
  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err) => {
      if (err) throw err
      server.start()
      return server
    }
  )
}
