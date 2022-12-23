import { ApolloClientProvider } from './lib/apollo'
import { Toaster } from 'react-hot-toast'
import { Router } from './Router'
import './App.scss'

function App() {
  return (
    <div className="App">
      <ApolloClientProvider>
        <Router />
      </ApolloClientProvider>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
