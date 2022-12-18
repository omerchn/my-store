import { ApolloClientProvider } from './lib/apollo'
import { Router } from './Router'
import './App.scss'

function App() {
  return (
    <div className="App">
      <ApolloClientProvider>
        <Router />
      </ApolloClientProvider>
    </div>
  )
}

export default App
