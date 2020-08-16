import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

export const link = new HttpLink({
  uri: process.env.VUE_APP_GRAPHQL
})

const accessToken = localStorage.getItem('idToken')

export const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext((context: any) => ({
    ...context,
    headers: {
      ...context.headers,
      authorization: accessToken
    }
  }))
  return forward(operation)
})

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions!.code === 'UNAUTHENTICATED') {
        const localstorage = window.localStorage
        localstorage.clear()
        location.replace('/')
      }
    }
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    location.replace("/")
  }
})
