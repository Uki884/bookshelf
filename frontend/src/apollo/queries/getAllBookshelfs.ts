import gql from "graphql-tag"

export const GET_ALL_BOOKSHELFS = gql`
  query getALlBookshelfs {
    allBookshelfs {
        id
        name
        description
        user {
          id
          name
        }
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
