<template>
  <div class="header">
    <div class="content">
      <div class="title">
        <span class="text">わたしの本棚</span>
      </div>
      <HeaderMenu
        :is-user-logged-in="isUserLoggedIn"
        :user="user"
        @logout="logout"
        @login="login" />
    </div>
    <div v-if="isUserLoggedIn" class="content">
      <ActionMenu />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext} from "@vue/composition-api"
import { useUserStore } from '@/store/userStore'
import HeaderMenu from '@/components/organisms/Header/HeaderMenu.vue'
import ActionMenu from '@/components/organisms/Header/ActionMenu.vue'

export default defineComponent({
  components: {
    HeaderMenu,
    ActionMenu
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

<style lang="scss" scoped>
.header{
  background: #F5F5F5;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
  .content {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    border-bottom: 1px solid #e7ebf3;
  }
  .title {
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
}

</style>