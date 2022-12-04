import * as grpc from '@grpc/grpc-js'
import * as itemsService from '../../__generated__/items-service/items'

const itemsClient = new itemsService.ItemsClient(
  'localhost:5000',
  grpc.credentials.createInsecure()
)

export const getAll = (filterBought: itemsService.FilterBought) => {
  return new Promise<Array<itemsService.Item>>((resolve, reject) => {
    const items: Array<itemsService.Item> = []
    const stream = itemsClient.streamAll(filterBought)
    stream.on('data', (data) => items.push(itemsService.Item.fromJSON(data)))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(items))
  })
}

export const getOne = async (id: string) => {
  return new Promise<itemsService.Item>((resolve, reject) => {
    itemsClient.getOne({ id }, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

export const addOne = async (data: itemsService.ItemInput) => {
  return new Promise<itemsService.Item>((resolve, reject) => {
    itemsClient.addOne(data, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

export const deleteOne = async (id: string) => {
  return new Promise<itemsService.ItemId>((resolve, reject) => {
    itemsClient.deleteOne({ id }, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

export const markBought = async (id: string) => {
  return new Promise<itemsService.ItemId>((resolve, reject) => {
    itemsClient.markBought({ id }, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}
