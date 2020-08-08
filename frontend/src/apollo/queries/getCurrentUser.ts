import gql from "graphql-tag"

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser{
      id
      name
      auth0Id
      email
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
