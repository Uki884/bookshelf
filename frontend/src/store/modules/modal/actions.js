export const actions = {
  openModal({ commit }, payload) {
    commit('openModal', payload)
  },
  closeModal({ commit }, payload) {
    commit('closeModal', payload)
  },
  closeAllModal({ commit }) {
    commit('closeAllModal')
  },
}
