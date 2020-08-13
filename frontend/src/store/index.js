import Vue from 'vue'
import Vuex from 'vuex'

import { modal } from '@/store/modules/modal/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modal,
  }
})