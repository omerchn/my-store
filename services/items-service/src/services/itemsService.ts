import { ItemsServiceServer } from '../../generated_items-service/items'
import { getAll, getOne, insertOne, deleteOne } from '../cassandra/queries'

export const itemsService: ItemsServiceServer = {
  async streamAll(call) {
    ;(await getAll()).forEach((item) => call.write(item))
    call.end()
  },
  async getOne(call, callback) {
    callback(null, await getOne(call.request.id))
  },
  async addOne(call, callback) {
    callback(null, await insertOne(call.request))
  },
  async deleteOne(call, callback) {
    callback(null, await deleteOne(call.request.id))
  },
}
