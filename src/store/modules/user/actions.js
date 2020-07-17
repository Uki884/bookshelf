import { RepositoryFactory } from "@/api/Factory/index.js"
const userRepository = RepositoryFactory.get("user")

export const actions = {
  async addUser({ commit, dispatch }, payload) {
    const request = {
      username: payload.username,
      email: payload.email,
      password1: payload.password,
      password2: payload.password_comfirm
    }
    console.log(request)
    try {
      const data = await userRepository.addUser(request)
      console.log(data)
      window.localStorage.setItem("token", data.data.key)
      dispatch('getUser')
    } catch(error) {
      console.log(error)
    }
  },
  async getUser({ commit }) {
    try {
      const data = await userRepository.getUser()
      commit('setUser', data.data)
      return data.data
    } catch(error) {
      console.log(error)
    }
  },
  async loginUser({ commit, dispatch }, payload) {
    try {
      const data = await userRepository.loginUser(payload)
      console.log(data)
      window.localStorage.setItem("token", data.data.key)
      const user = await dispatch("getUser")
      return user
    } catch(error) {
      console.log(error)
    }
  },
}
