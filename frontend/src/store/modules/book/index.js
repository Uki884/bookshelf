import { actions } from './actions'
import { state } from './state'
import { mutations } from './mutations'
import { getters } from './getters'

export const book = {
  namespaced: true,
  actions,
  state,
  mutations,
  getters
}
