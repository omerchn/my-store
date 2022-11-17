import { query } from '../cassandra/utils'
import { v4 as uuid } from 'uuid'

interface values {
  name: string
  description: string
  price: number
  isBought: boolean
}

export default async (values: values) => {
  return await query(
    `INSERT INTO garagesale.items (id, name, description, price, isBought) VALUES ('${uuid()}', '${
      values.name
    }', '${values.description}', ${values.price}, ${values.isBought})`
  )
}
