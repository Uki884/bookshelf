const defaultState = {
  book: {},
  bookAreaState: {
    isDetected: false,
    searchResult: false
  }
}

export const mutations = {
  setBook(state, payload) {
    state.book = payload
  },
  setSearchBooks(state, payload) {
    state.searchBooks = payload
  },
  clearSearchBooks(state) {
    state.searchBooks = []
  },
  setPagination(state, payload) {
    state.pagination = payload
    console.log(state.pagination)
  },
  clearPagenation(state) {
    state.pagination = {}
  },
  clearBook(state) {
    Object.assign(state.book, defaultState.book)
    Object.assign(state.bookAreaState, defaultState.bookAreaState)
  },
  setBooks(state, payload) {
    state.books = payload
  },
  updateBook(state, payload) {
    const index = state.bookShelf.findIndex(item => item.id === payload.bookShelf)
    if (state.bookShelf[index].books.length <= 4) {
      state.bookShelf[index].books.push(payload.data)
    } else {
      state.bookShelf[index + 1].books.push(payload.data)
    }
  },
  setBookShelf(state, payload) {
    state.bookShelf = payload
  },
  setDetected(state, payload) {
    state.bookAreaState.isDetected = payload
  },
  setSearchResult(state, payload) {
    state.bookAreaState.searchResult = payload
  },
  setEdit(state, payload) {
    if (payload.flg) {
      state.isEdit.push(payload.parentIndex)
    } else {
      const index = state.isEdit.findIndex(item => item === payload.parentIndex)
      state.isEdit.splice(index, 1)
    }
  },
  setEditPosition(state, payload) {
    if (payload.flg) {
      state.isEditPosition.push(payload.parentIndex)
    } else {
      const index = state.isEditPosition.findIndex(item => item === payload.parentIndex)
      state.isEditPosition.splice(index, 1)
    }
  },
  setVisibleMenu(state, payload) {
    state.visibleMenu = payload
  }
}
