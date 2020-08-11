import gql from "graphql-tag"

export const DELETE_BOOKSHELF = gql`
  mutation deleteBookshelf($bookshelfId: Int) {
    deleteBookshelf(bookshelfId: $bookshelfId) {
      id
      name
      description
    }
  }
`
