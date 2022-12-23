// wrap the generated items service callback-based RPCs in Promises

import * as grpc from '@grpc/grpc-js'
import * as itemsService from '../../__generated__/items-service/items'

const itemsClient = new itemsService.ItemsClient(
  'localhost:5000',
  grpc.credentials.createInsecure()
)

export const logServiceConnection = () => {
  console.log('waiting for items service...')
  itemsClient.waitForReady(Date.now() + 10000, (err) => {
    if (!err) console.log('✅ Connected to Items Service')
    else console.error(`❌ Can't Connect to Items Service, ${err}`)
  })
}

export const getAll = (filterBought: itemsService.FilterBought) => {
  return new Promise<Array<itemsService.Item>>((resolve, reject) => {
    const items: Array<itemsService.Item> = []
    const stream = itemsClient.streamAll(filterBought)
    stream.on('data', (data) => items.push(itemsService.Item.fromJSON(data)))
    stream.on('error', (err) => {
      console.error(`Items service error: ${err}`)
      reject(new Error("Server Error, Can't Get Items"))
    })
    stream.on('end', () => resolve(items))
  })
}

export const getOne = async (id: string) => {
  return new Promise<itemsService.Item>((resolve, reject) => {
    itemsClient.getOne({ id }, (err, res) => {
      if (err) {
        console.error(`Items service error: ${err}`)
        return reject(new Error("Server Error, Can't Get Item"))
      }
      resolve(res)
    })
  })
}

export const addOne = async (data: itemsService.ItemInput) => {
  return new Promise<itemsService.Item>((resolve, reject) => {
    itemsClient.addOne(data, (err, res) => {
      if (err) {
        console.error(`Items service error: ${err}`)
        return reject(new Error("Server Error, Can't Add Item"))
      }
      resolve(res)
    })
  })
}

export const deleteOne = async (id: string) => {
  return new Promise<itemsService.ItemId>((resolve, reject) => {
    itemsClient.deleteOne({ id }, (err, res) => {
      if (err) {
        console.error(`Items service error: ${err}`)
        return reject(new Error("Server Error, Can't Remove Item"))
      }
      resolve(res)
    })
  })
}

export const markBought = async (id: string) => {
  return new Promise<itemsService.ItemId>((resolve, reject) => {
    itemsClient.markBought({ id }, (err, res) => {
      if (err) {
        console.error(`Items service error: ${err}`)
        return reject(new Error("Server Error, Can't Mark Bought"))
      }
      resolve(res)
    })
  })
}
