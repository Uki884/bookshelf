import gql from "graphql-tag"

export const CHANGE_BOOKSHELF_NAME = gql`
  mutation changeBookshelfName($input: changeBookshelfNameInput) {
    changeBookshelfName(input: $input) {
        id
        name
        description
    }
  }
`
