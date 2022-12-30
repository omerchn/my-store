import * as grpc from '@grpc/grpc-js'
import * as stargate from '@stargate-oss/stargate-grpc-node-client'
import { responseToArray } from './utils'

export const getClient = (token: string, address: string) => {
  const credentials = grpc.credentials.combineChannelCredentials(
    grpc.credentials.createSsl(),
    new stargate.StargateBearerToken(token)
  )
  const client = stargate.promisifyStargateClient(
    new stargate.StargateClient(address, credentials)
  )

  return {
    client,
    query: async (cql: string) => {
      const query = new stargate.Query()
      query.setCql(cql)
      return responseToArray(await client.executeQuery(query))
    },
  }
}
