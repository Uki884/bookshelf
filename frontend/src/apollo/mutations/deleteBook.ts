import gql from "graphql-tag"

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: Int) {
    deleteBook(bookId: $bookId) {
      id
      title
    }
  }
`
