export const mutations = {
  setUser(state, payload) {
    state.user = payload
    const data = {
      user_id: payload.pk,
      username: payload.username,
      email: payload.email
    }
    state.user = data
    state.isUserLoggedIn = true
  },
  setUserBookShelf(state, payload) {
    state.userBookShelf = payload
  },
  clearUser(state) {
    state.user = {}
    state.isUserLoggedIn = false
    window.localStorage.removeItem('token')
  }
}
