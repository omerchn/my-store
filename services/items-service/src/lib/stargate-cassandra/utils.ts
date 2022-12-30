import * as grpc from '@grpc/grpc-js'
import * as stargate from '@stargate-oss/stargate-grpc-node-client'

const getFunction = (basic: number) => {
  if (basic === 13) return 'getString'
  if (basic === 8) return 'getFloat'
  if (basic === 4) return 'getBoolean'
  return 'getString'
}

export const responseToArray = (response: stargate.Response) => {
  const set = response.getResultSet()
  if (!set) return []
  const columns: Array<{ name: string; function: string }> = set
    .getColumnsList()
    .map((col) => ({
      name: col.getName(),
      function: getFunction(col.getType()!.getBasic()),
    }))

  const result: Array<unknown> = set.getRowsList().map((row) => {
    const rowObj: { [key: string]: any } = {}
    row.getValuesList().forEach((value, index) => {
      rowObj[columns[index].name] = (value as any)[columns[index].function]()
    })
    return rowObj
  })
  return result
}

export const databaseGrpcError: grpc.ServerErrorResponse = {
  message: 'Error Connecting to Database',
  name: 'Database Error',
  code: 500,
}
