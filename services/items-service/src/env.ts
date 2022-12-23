import { z } from 'zod'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const devDb = {
  ASTRA_URI:
    '54bc0df0-a91e-4903-bb01-62ff347c7469-europe-west1.apps.astra.datastax.com:443',
  ASTRA_TOKEN:
    'AstraCS:AZcfSscJdZfWaJzQuCmKEvES:ee83f122464093915868ff82c6ee1b393ea628afca2ba91fa323000215586485',
}

const envSchema = z.object({
  ASTRA_URI: z.string().default(devDb.ASTRA_URI),
  ASTRA_TOKEN: z.string().default(devDb.ASTRA_TOKEN),
})

const envParsed = envSchema.safeParse(process.env)

if (!envParsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(envParsed.error.format(), null, 4)
  )
  process.exit(1)
}

export const env = envParsed.data
