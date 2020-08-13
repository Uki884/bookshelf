import gql from "graphql-tag"

export const ADD_BOOK = gql`
  mutation addBook($input: addBookInput) {
    addBook(input: $input) {
      id
      title
    }
  }
`
