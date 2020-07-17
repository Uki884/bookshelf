import Vue from 'vue'
import Vuex from 'vuex'

import { book } from '@/store/modules/book/index'
import { modal } from '@/store/modules/modal/index'
import { user } from '@/store/modules/user/index'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const persistant = createPersistedState({
  key: "vuex",
  reducer(val) {
    if (val.user.isUserLoggedIn === false) {
      return {}
    }
    return val
  },
})
export default new Vuex.Store({
  plugins: [persistant],
  modules: {
    book,
    modal,
    user
  }
})