import Repository from "@/api"

const resource = process.env.VUE_APP_API_URL

export default {
  addUser(payload: any) {
    return Repository.post(`${resource}/rest-auth/registration/`, payload)
  },
  getUser() {
    return Repository.get(`${resource}/rest-auth/user/`)
  },
  loginUser(payload: any) {
    return Repository.post(`${resource}/rest-auth/login/`, payload)
  },
  getUserBook(payload: any) {
    return Repository.get(`${resource}/api/users/${payload}/get_user_book/`)
  },
}
