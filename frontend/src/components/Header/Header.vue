<template>
  <div class="header">
    <div class="header__title">
      <span class="header__title--text">わたしの本棚</span>
    </div>
    <HeaderMenu
      :is-user-logged-in="isUserLoggedIn"
      :user="user"
      @logout="logout"
      @login="login" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext} from "@vue/composition-api"
import { useUserStore } from '@/store/userStore'
import HeaderMenu from '@/components/Header/HeaderMenu.vue'

export default defineComponent({
  components: {
    HeaderMenu
  },
  setup(props: any, context: SetupContext) {
    const { login, logout, user, isUserLoggedIn} = useUserStore()
    const handleSidemenu = () => {
      context.emit('click')
    }
    return {
      user,
      isUserLoggedIn,
      handleSidemenu,
      login,
      logout
    }
  }
})
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
    align-items: center;
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