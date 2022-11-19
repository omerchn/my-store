import { startServer } from './grpc'

const run = async () => {
  const port = 5000
  try {
    await startServer(port)
    console.log(`✅ Items Service Started (port ${port})`)
  } catch (err) {
    console.log('❌ Error Starting Items Service', err)
  }
}
run()
