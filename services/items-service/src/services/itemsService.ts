import { ItemsServiceServer } from '../../generated/proto/items'
import { getAll, getOne, insertOne } from '../cassandra/queries'

export const itemsService: ItemsServiceServer = {
  getAll(call, callback) {
    // placeholder
    callback(null, {
      items: [
        {
          id: 'wow',
          name: 'wow',
          description: 'wow',
          price: 2.5,
          isBought: false,
        },
      ],
    })
  },
  getOne(call, callback) {
    // placeholder
    callback(null, {
      id: 'wow',
      name: 'wow',
      description: 'wow',
      price: 2.5,
      isBought: false,
    })
  },
  addOne(call, callback) {
    // placeholder
    callback(null, {
      id: 'wow',
      name: 'wow',
      description: 'wow',
      price: 2.5,
      isBought: false,
    })
  },
}
