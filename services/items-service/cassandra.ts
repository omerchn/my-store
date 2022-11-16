import { env } from './env'
import * as grpc from '@grpc/grpc-js'
import {
  promisifyStargateClient,
  Query,
  StargateBearerToken,
  StargateClient,
} from '@stargate-oss/stargate-grpc-node-client'

const bearerToken = new StargateBearerToken(env.ASTRA_TOKEN)
const credentials = grpc.credentials.combineChannelCredentials(
  grpc.credentials.createSsl(),
  bearerToken
)

export const stargateClient = new StargateClient(env.ASTRA_URI, credentials)
export const promisifiedClient = promisifyStargateClient(stargateClient)

export const executeQuery = async (queryString: string) => {
  const query = new Query()
  query.setCql(queryString)
  return await promisifiedClient.executeQuery(query)
}
