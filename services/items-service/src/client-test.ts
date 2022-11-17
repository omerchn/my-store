import * as grpc from '@grpc/grpc-js'
import { Empty } from '../generated/google/protobuf/empty'
import { ItemsServiceClient } from '../generated/proto/items'

const s = new ItemsServiceClient(
  'localhost:4000',
  grpc.credentials.createInsecure()
)

s.getAll(Empty, (err, res) => {
  console.log(res)
})
