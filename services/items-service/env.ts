import { z } from 'zod'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, './.env') })

const envSchema = z.object({
  ASTRA_URI: z.string(),
  ASTRA_TOKEN: z.string(),
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
