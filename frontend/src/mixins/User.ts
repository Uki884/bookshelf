import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({ user: "user/user" }),
  },
  methods: {
    isLoggedIn(): boolean {
      const user = (this as any).user
      return Object.keys(user).length > 0
    }
  },
}
