<template>
  <div
    class="right"
    @mouseover="visbleUserMenu = true"
    @mouseleave="visbleUserMenu = false">
    <div
      class="right"
      @click="isUserLoggedIn ? null : login()"
      v-text="isUserLoggedIn ? user.name : 'ログイン'" />
    <v-icon
      v-if="isUserLoggedIn"
      name="angle-down" />
    <transition name="fade">
      <div
        v-if="visbleUserMenu && isUserLoggedIn"
        class="menu">
        <div
          class="item"
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

  .menu{
    z-index: 999;
    height: 300px;
    width: 200px;
    position: absolute;
    top: 32px;
    padding: 13px;
    right: 12px;
    background: #F5F5F5;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    .item {
      padding: 6px 12px;
    }
  }

  .right{
    padding-right: 12px;
    font-weight: bold;
    display: flex;
    cursor: pointer;
  }
</style>