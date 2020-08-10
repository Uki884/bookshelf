import gql from "graphql-tag"

export const SAVE_BOOK_POSITION = gql`
  mutation saveBookPosition($input: [saveBookPositionInput]) {
    saveBookPosition(input: $input) {
      id
      column_no
      row_no
    }
  }
`
