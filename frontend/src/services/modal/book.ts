import store from '@/store/index'

export const book = {
  addBook(type: string, payload: any) {
    store.dispatch('modal/openModal', {
      component: type,
      params: payload
    })
  },
  selectBook(payload: any) {
    store.dispatch('modal/openModal', {
      component: "SelectBookModal",
      params: payload
    })
  },
  deleteBook(payload: any) {
    store.dispatch('modal/openModal', {
      component: 'DeleteBookModal',
      params: payload
    })
  },
  deleteBookShelf(payload: any) {
    store.dispatch('modal/openModal', {
      component: 'DeleteBookShelfModal',
      params: payload
    })
  },
  addBookShelf(payload: any) {
    store.dispatch('modal/openModal', {
      component: 'AddBookShelfModal',
      params: payload
    })
  },
  changeBookShelfName(payload: any) {
    store.dispatch('modal/openModal', {
      component: 'ChangeBookShelfNameModal',
      params: payload
    })
  },
  bookDetail(payload: any) {
    store.dispatch('modal/openModal', {
      component: 'BookDetailModal',
      params: payload
    })
  },
  changeBookPositionComfirm(payload: any) {
    store.dispatch('modal/openModal', {
      component: 'ChangeBookPositionComfirmModal',
      params: payload
    })
  },
  chooseAddBookType(payload: any) {
    store.dispatch('modal/openModal', {
      component: 'ChooseAddBookTypeModal',
      params: payload
    })
  },
}

