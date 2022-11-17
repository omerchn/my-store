import { startServer } from './grpc'

startServer(4000, () => {
  console.log('✅ Server Started')
})
