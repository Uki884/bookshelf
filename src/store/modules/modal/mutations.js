export const mutations = {
  openModal(state, modal) {
    // 既に表示されてるモーダルは追加できない
    const result = state.modals.some(item => item.component == modal.component)
    if (!result) {
      state.modals.push(modal)
    }
  },
  closeModal(state) {
    state.modals.pop()
  },
  closeAllModal(state) {
    state.modals = []
  }
}
