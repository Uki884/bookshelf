import gql from 'graphql-tag'

export const CREATE_USER = gql`
mutation createUser($input: createUserInput) {
  createUser(input: $input) {
    id
    name
    email
    auth0Id
  }
}
`
