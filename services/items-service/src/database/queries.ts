import { v4 as uuid } from 'uuid'
import * as generated from '../../__generated__/items-service/items'
import { getClient } from '../lib/stargate-cassandra/client'
import { env } from '../env'

const { query } = getClient(env.ASTRA_TOKEN, env.ASTRA_URI)

export const getAll = async ({ bought }: generated.FilterBought) => {
  const res = await query(
    'SELECT * FROM store.items' +
      (bought !== undefined ? ` WHERE bought = ${bought}` : '')
  )
  return res as Array<generated.Item>
}

export const getOne = async ({ id }: generated.ItemId) => {
  const res = await query(`SELECT * FROM store.items WHERE id='${id}'`)
  return res[0] as generated.Item
}

export const addOne = async (data: generated.ItemInput) => {
  const item: generated.Item = {
    id: uuid(),
    bought: false,
    ...data,
  }
  await query(
    `INSERT INTO store.items (id, name, description, price, bought) VALUES ('${item.id}', '${item.name}', '${item.description}', ${item.price}, ${item.bought})`
  )
  return item as generated.Item
}

export const deleteOne = async ({ id }: generated.ItemId) => {
  await query(`DELETE FROM store.items WHERE id='${id}' IF EXISTS`)
  return { id } as generated.ItemId
}

export const markBoughtOne = async ({ id }: generated.ItemId) => {
  await query(`UPDATE store.items SET bought = true WHERE id='${id}' IF EXISTS`)
  return { id } as generated.ItemId
}
