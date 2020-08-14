import gql from "graphql-tag"

export const GET_USER_BOOKSHELFS = gql`
  query getUserBookshelfs($userId: String) {
    userBookshelfs(userId: $userId) {
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
`
