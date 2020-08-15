import gql from 'graphql-tag'

export const CREATE_USER = gql`
mutation createUser($input: createUserInput) {
  createUser(input: $input) {
    id
    name
    email
    auth0Id
    bookShelf {
        id
        name
        description
        books {
          id
          title
          cover
          author
          isbn
          price
          publisher
          image
          bookPosition {
            id
            row_no
            column_no
          }
        }
      }
  }
}
`
