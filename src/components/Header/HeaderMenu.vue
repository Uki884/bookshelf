<template>
  <div
    class="header__right"
    @mouseover="visbleUserMenu = true"
    @mouseleave="visbleUserMenu = false">
    <span>{{ user.username }}
      <v-icon name="angle-down" />
    </span>
    <transition name="fade">
      <div
        v-if="visbleUserMenu"
        class="header__menu">
        <!-- <div class="header__menu__item" @click="addBookShelf()">本棚追加</div> -->
        <!-- <div class="header__menu__item" @click="mybookshelf()">わたしの本棚</div> -->
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
  data() {
    return {
      visbleUserMenu: false,
    }
  },
  methods: {
    logout() {
      this.$store.commit('user/clearUser')
      window.location.href = '/login'
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