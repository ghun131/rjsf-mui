import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './App.scss'
import Home from './pages/Home'

const client = new ApolloClient({
  uri: process.env.REACT_APP_HASURA_URL ?? 'No uri env found',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret':
      process.env.REACT_APP_HASURA_ADMIN_SECRET ?? 'No secret env found',
  },
})

const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Home />
      </div>
    </ApolloProvider>
  )
}

export default App
