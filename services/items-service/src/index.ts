import { startServer } from './grpc'

const run = async () => {
  try {
    await startServer(4000)
    console.log('✅ Items Service Started')
  } catch (err) {
    console.log('❌ Error Starting Service', err)
  }
}
run()
