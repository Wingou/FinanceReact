import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://192.168.1.109:4000/graphql',
  headers: {
    // Force une requête "simple" (évite le preflight CORS)
    'Content-Type': 'application/json',
  }
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

