<template>
  <div>
    <Header @click="handleSidemenu" />
    <div
      id="main"
      class="main-content">
      <Sidemenu
        :is-open="state.isOpen"
        @click="handleSidemenu"
        :isUserLoggedIn="isUserLoggedIn"
        @hiddenSidemenu="hiddenSidemenu" />
      <router-view />
      <Modals />
    </div>
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header/Header.vue'
import Sidemenu from '@/components/Sidemenu/Sidemenu.vue'
import GlobalProvide from '@/components/Providers/GlobalProvider.vue'
import { mapGetters } from 'vuex'
import Modals from '@/components/Modals.vue'
import { isSmartPhone } from  '@/utils/useIsDevice.ts'
import { useUserStore } from '@/store/userStore'

import {
  defineComponent,
  SetupContext,
  reactive,
  computed,
} from "@vue/composition-api"

export default defineComponent({
  components: {
    Header,
    Modals,
    Sidemenu
  },
  setup(props: any, context: SetupContext) {
    const { useGetUser, user, isUserLoggedIn } = useUserStore()
    const getUser = async() => {
      await useGetUser()
    }
    const state = reactive({
      isOpen: isSmartPhone() ? false : true,
      user: user
    })

    const modals = computed(()=> {
      return context.root.$store.getters['modal/modals']
    })

    const handleSidemenu =() => {
      state.isOpen = !state.isOpen
    }

    const hiddenSidemenu = (flag: boolean) => {
      state.isOpen = flag
    }

    const addBookShelf = () => {
      (context as any).root.ModalService.addBookShelf()
    }

    getUser()

    return {
      state,
      modals,
      isUserLoggedIn,
      handleSidemenu,
      hiddenSidemenu,
      addBookShelf
    }
  }
})
</script>

<style>

</style>