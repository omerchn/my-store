import * as grpc from '@grpc/grpc-js'
import { itemsService } from './services/items'
import { ItemsService } from '../__generated__/items-service/items'

export const server = new grpc.Server()
server.addService(ItemsService, itemsService)

export const startServer = async (port: number) => {
  return new Promise<grpc.Server>((resolve, reject) => {
    server.bindAsync(
      `0.0.0.0:${port}`,
      grpc.ServerCredentials.createInsecure(),
      (err) => {
        if (err) return reject(err)
        server.start()
        resolve(server)
      }
    )
  })
}
