import { ApolloClient, InMemoryCache } from '@apollo/client';

export const initializeApollo = () => new ApolloClient({
    uri: 'http://localhost:5000/api/graphql',
    cache: new InMemoryCache(),
});