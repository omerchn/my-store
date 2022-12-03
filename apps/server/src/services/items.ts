import * as grpc from '@grpc/grpc-js'
import {
  Item,
  ItemId,
  ItemInput,
  ItemsClient,
  FilterBought,
} from '../../__generated__/items-service/items'

const itemsClient = new ItemsClient(
  'localhost:5000',
  grpc.credentials.createInsecure()
)

export const getAll = (filterBought: FilterBought) => {
  return new Promise<Array<Item>>((resolve, reject) => {
    const items: Array<Item> = []
    const stream = itemsClient.streamAll(filterBought)
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

export const addOne = async (data: ItemInput) => {
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

export const markBought = async (id: string) => {
  return new Promise<ItemId>((resolve, reject) => {
    itemsClient.markBought({ id }, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}
