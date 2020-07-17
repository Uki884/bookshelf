export const getters = {
  books: (state) => {
    return state.books
  },
  bookShelf: (state) => {
    return state.bookShelf
  },
  book: (state) => {
    return state.book
  },
  searchBooks: (state) => {
    return state.searchBooks
  },
  pagination: (state) => {
    return state.pagination
  },
  bookAreaState: (state) => {
    return state.bookAreaState
  },
  isEdit: (state) => {
    return state.isEdit
  },
  isEditPosition: (state) => {
    return state.isEditPosition
  },
  visibleMenu: (state) => {
    return state.visibleMenu
  }
}
