import * as grpc from '@grpc/grpc-js'
import { Empty } from '../../__generated__/items-service/google/protobuf/empty'
import {
  Item,
  ItemId,
  ItemNoId,
  ItemsClient,
} from '../../__generated__/items-service/items'

const itemsClient = new ItemsClient(
  'localhost:5000',
  grpc.credentials.createInsecure()
)

export const getAll = () => {
  return new Promise<Array<Item>>((resolve, reject) => {
    const items: Array<Item> = []
    const stream = itemsClient.streamAll(Empty)
    stream.on('data', (data) => items.push(Item.fromJSON(data)))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(items))
  })
}

export const getOne = async (id: string) => {
  return new Promise<Item>((resolve, reject) => {
    itemsClient.getOne({ id }, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

export const addOne = async (data: ItemNoId) => {
  return new Promise<Item>((resolve, reject) => {
    itemsClient.addOne(data, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

export const deleteOne = async (id: string) => {
  return new Promise<ItemId>((resolve, reject) => {
    itemsClient.deleteOne({ id }, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}
