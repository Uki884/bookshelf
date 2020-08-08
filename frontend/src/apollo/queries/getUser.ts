import gql from "graphql-tag"

export const GET_USER = gql`
  query getUser($auth0Id: String) {
    user(auth0Id: $auth0Id) {
      id
      name
      auth0Id
      email
    }
  }
`
