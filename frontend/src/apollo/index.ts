import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { authMiddleware, link, errorLink } from "./link"

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authMiddleware, errorLink, link]),
  cache,
  defaultOptions: {
    fetchPolicy: 'no-cache'
  }
})