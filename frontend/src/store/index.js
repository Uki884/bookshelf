import Vue from 'vue'
import Vuex from 'vuex'

import { modal } from '@/store/modules/modal/index'
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
    modal,
  }
})