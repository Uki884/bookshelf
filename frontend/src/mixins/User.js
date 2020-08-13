import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({ user: "user/user" }),
  },
  methods: {
    isLoggedIn() {
      return Object.keys(this.user).length > 0
    }
  },
}
