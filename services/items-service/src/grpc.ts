import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'
import { itemsService } from './services/itemsService'

const packageDef = protoLoader.loadSync(
  path.resolve(__dirname, '../proto/items.proto')
)
const grpcObject = grpc.loadPackageDefinition(packageDef)
const itemsPackage = grpcObject.itemsPackage

export const server = new grpc.Server()

// @ts-ignore
server.addService(itemsPackage.ItemsService.service, itemsService)

export const startServer = (
  port: number,
  cb: (server: grpc.Server) => void
) => {
  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start()
      cb(server)
      return server
    }
  )
}
