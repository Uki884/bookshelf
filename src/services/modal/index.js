import { book } from '@/services/modal/book.js'
import store from '@/store/index'

export default {
  ...book,
  close() {
    store.dispatch('modal/closeModal')
    store.commit('book/clearBook')
  },
  closeAll() {
    store.dispatch("modal/closeAllModal")
  }
}