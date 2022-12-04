import * as stargate from '@stargate-oss/stargate-grpc-node-client'
import { promisifiedClient } from './connect'

const getGetFnName = (basic: number) => {
  if (basic === 13) return 'getString'
  if (basic === 8) return 'getFloat'
  if (basic === 4) return 'getBoolean'
  return 'getString'
}

export const responseToArray = (response: stargate.Response) => {
  const set = response.getResultSet()
  if (!set) return []
  const columns: Array<{ name: string; getFnName: string }> = set
    .getColumnsList()
    .map((col) => ({
      name: col.getName(),
      getFnName: getGetFnName(col.getType()!.getBasic()),
    }))

  const result: Array<unknown> = set.getRowsList().map((row) => {
    const rowObj: { [key: string]: any } = {}
    row.getValuesList().forEach((value, i) => {
      rowObj[columns[i].name] = (value as any)[columns[i].getFnName]()
    })
    return rowObj
  })
  return result
}

export const query = async (qString: string) => {
  const query = new stargate.Query()
  query.setCql(qString)
  return responseToArray(await promisifiedClient.executeQuery(query))
}
