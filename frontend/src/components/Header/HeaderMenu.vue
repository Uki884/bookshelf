<template>
  <div
    class="header__right"
    @mouseover="visbleUserMenu = true"
    @mouseleave="visbleUserMenu = false">
    <div
      class="header__right"
      @click="isUserLoggedIn ? logout() : login()"
      v-text="isUserLoggedIn ? user.name : 'ログイン'" />
    <v-icon
      v-if="isUserLoggedIn"
      name="angle-down" />
    <transition name="fade">
      <div
        v-if="visbleUserMenu && isUserLoggedIn"
        class="header__menu">
        <div
          class="header__menu__item"
          @click="logout()">
          ログアウト
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isUserLoggedIn: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      visbleUserMenu: false,
    }
  },
  methods: {
    logout() {
      this.$emit('logout')
    },
    login() {
      this.$emit('login')
    }
  }

}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>