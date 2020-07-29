import Repository from "@/api/index"

const resource = process.env.VUE_APP_API_URL

export default {
  addUser(payload) {
    return Repository.post(`${resource}/rest-auth/registration/`, payload)
  },
  getUser() {
    return Repository.get(`${resource}/rest-auth/user/`)
  },
  loginUser(payload) {
    return Repository.post(`${resource}/rest-auth/login/`, payload)
  },
  getUserBook(payload) {
    return Repository.get(`${resource}/api/users/${payload}/get_user_book/`)
  },
}
