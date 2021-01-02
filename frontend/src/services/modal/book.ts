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
      component: "SelectBook",
      params: payload
    })
  },
  deleteBook(payload: any) {
    store.dispatch('modal/openModal', {
      component: 'DeleteBook',
      params: payload
    })
  },
  deleteBookShelf(payload: any) {
    store.dispatch('modal/openModal', {
      component: 'DeleteBookShelf',
      params: payload
    })
  },
  addBookShelf(payload: any) {
    store.dispatch('modal/openModal', {
      component: 'AddBookShelf',
      params: payload
    })
  },
  changeBookShelfName(payload: any) {
    store.dispatch('modal/openModal', {
      component: 'ChangeBookShelfName',
      params: payload
    })
  },
  bookDetail(payload: any) {
    store.dispatch('modal/openModal', {
      component: 'BookDetail',
      params: payload
    })
  },
  changeBookPositionComfirm(payload: any) {
    store.dispatch('modal/openModal', {
      component: 'ChangeBookPositionComfirm',
      params: payload
    })
  },
  chooseAddBookType(payload: any) {
    store.dispatch('modal/openModal', {
      component: 'ChooseAddBookType',
      params: payload
    })
  },
}

