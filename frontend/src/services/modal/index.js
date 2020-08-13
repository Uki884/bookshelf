import { book } from '@/services/modal/book.js'
import store from '@/store/index'

export default {
  ...book,
  close() {
    store.dispatch('modal/closeModal')
  },
  closeAll() {
    store.dispatch("modal/closeAllModal")
  }
}