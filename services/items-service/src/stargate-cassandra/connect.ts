import { env } from '../env'
import * as grpc from '@grpc/grpc-js'
import * as stargate from '@stargate-oss/stargate-grpc-node-client'

const bearerToken = new stargate.StargateBearerToken(env.ASTRA_TOKEN)
const credentials = grpc.credentials.combineChannelCredentials(
  grpc.credentials.createSsl(),
  bearerToken
)

export const stargateClient = new stargate.StargateClient(
  env.ASTRA_URI,
  credentials
)
export const promisifiedClient =
  stargate.promisifyStargateClient(stargateClient)
