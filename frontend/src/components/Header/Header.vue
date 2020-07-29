<template>
  <div class="header">
    <div class="header__title">
      <v-icon
        v-if="isSmartPhone()"
        scale="1.5"
        class=""
        name="bars"
        @click.native="handleSidemenu()" />
      <span class="header__title--text">みんなの本棚</span>
    </div>
    <div
      v-if="Object.keys(user).length <= 0"
      class="header__right">
      <div @click="login()">
        ログイン
      </div>
    </div>
    <HeaderMenu
      v-else
      :user="user" />
  </div>
</template>

<script>
import HeaderMenu from '@/components/Header/HeaderMenu.vue'
import ModalService from '@/services/modal/index.js'
import { isSmartPhone } from '@/utils/useIsDevice.ts'
import { mapGetters } from 'vuex'

export default {
  components: {
    HeaderMenu,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rightMenu: false
    }
  },
  computed: {
    ...mapGetters({ user: 'user/user' }),
  },
  methods: {
    handleSidemenu(){
      this.$emit('click')
    },
    login() {
      this.$router.push('/login').catch(err => {})
    },
    mybookshelf() {
      this.$router.push('/my_bookshelf').catch(err => {})
    }
  }
}
</script>

<style lang="scss">
.header{
  background: #F5F5F5;
  position: sticky;
  top: 0;
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 2;
  justify-content: space-between;
  &__icon {
    vertical-align: text-bottom;
  }
  &__title {
    padding-left: 12px;
    font-size: 26px;
    display: flex;
    span {
      padding-left: 16px;
    }
    svg {
      cursor: pointer;
      margin-left: 12px;
    }
  }
  &__right{
    padding-right: 12px;
    font-weight: bold;
    display: flex;
    cursor: pointer;
  }
  &__menu{
    height: 300px;
    width: 200px;
    position: absolute;
    top: 32px;
    padding: 13px;
    right: 12px;
    background: #F5F5F5;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    &__item {
      padding: 6px 12px;
    }
  }
}

</style>