import gql from "graphql-tag"

export const CREATE_BOOKSHELF = gql`
  mutation createBookshelf($input: createBookshelfInput) {
    createBookshelf(input: $input) {
      id
      name
      description
    }
  }
`
