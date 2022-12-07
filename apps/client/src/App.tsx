import './App.scss'

// apollo
import { ApolloClientProvider } from './lib/apollo'

// router
import { Router } from './Router'

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
