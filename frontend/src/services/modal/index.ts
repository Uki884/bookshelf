import { book } from '@/services/modal/book'
import store from '@/store'

export default {
  ...book,
  close() {
    store.dispatch('modal/closeModal')
  },
  closeAll() {
    store.dispatch("modal/closeAllModal")
  }
}