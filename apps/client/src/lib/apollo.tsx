import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

export function ApolloClientProvider(props: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
