import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = createHttpLink({
    uri: 'http://localhost:8010/proxy/graphql'
})

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})
