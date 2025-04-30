import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { store } from './store/store'
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo-client'
import './styles/tailwind.css';

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={apolloClient}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </ApolloProvider>


)
