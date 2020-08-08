import gql from "graphql-tag"

export const GET_USER = gql`
  query getUserBookshelfs {
    userBookshelfs {
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
