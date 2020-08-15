import store from '@/store/index'
export const book = {
  addBook(type, payload) {
    store.dispatch('modal/openModal', {
      component: type,
      params: payload
    })
  },
  selectBook(payload) {
    store.dispatch('modal/openModal', {
      component: "SelectBook",
      params: payload
    })
  },
  deleteBook(payload) {
    store.dispatch('modal/openModal', {
      component: 'DeleteBook',
      params: payload
    })
  },
  deleteBookShelf(payload) {
    store.dispatch('modal/openModal', {
      component: 'DeleteBookShelf',
      params: payload
    })
  },
  addBookShelf(payload) {
    store.dispatch('modal/openModal', {
      component: 'AddBookShelf',
      params: payload
    })
  },
  changeBookShelfName(payload) {
    store.dispatch('modal/openModal', {
      component: 'ChangeBookShelfName',
      params: payload
    })
  },
  bookDetail(payload) {
    store.dispatch('modal/openModal', {
      component: 'BookDetail',
      params: payload
    })
  },
  changeBookPositionComfirm(payload) {
    store.dispatch('modal/openModal', {
      component: 'ChangeBookPositionComfirm',
      params: payload
    })
  },
  chooseAddBookType(payload) {
    store.dispatch('modal/openModal', {
      component: 'ChooseAddBookType',
      params: payload
    })
  },
}

