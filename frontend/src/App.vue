<template>
  <GlobalProvide>
    <div id="app">
      <HeaderContent @click="handleSidemenu" />
      <div
        id="main"
        class="main-content">
        <Sidemenu
          :is-open="state.isOpen"
          @click="handleSidemenu"
          @hiddenSidemenu="hiddenSidemenu" />
        <router-view />
        <Modals />
      </div>
    <!-- <Footer /> -->
    </div>
  </GlobalProvide>
</template>

<script lang="ts">

import 'normalize.css'
import HeaderContent from '@/components/Header/Header.vue'
import Sidemenu from '@/components/Sidemenu/Sidemenu.vue'
import GlobalProvide from '@/components/Providers/GlobalProvider.vue'
import { mapGetters } from 'vuex'
import Modals from '@/components/Modals.vue'
import { isSmartPhone } from  '@/utils/useIsDevice.ts'

import {
  defineComponent,
  SetupContext,
  reactive,
  computed,
} from "@vue/composition-api"

export default defineComponent({
  components: {
    HeaderContent,
    GlobalProvide,
    Modals,
    // Footer,
    Sidemenu
  },
  setup(props: any, context: SetupContext) {
    const state = reactive({
      isOpen: isSmartPhone() ? false : true
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

    return {
      state,
      modals,
      handleSidemenu,
      hiddenSidemenu,
      addBookShelf
    }
  }
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Serif+JP&display=swap');
@import '@/assets/scss/responsive.scss';
body {
  overscroll-behavior: none;
  width: 100%;
}
#app {
  height: 100vh;
  font-family: 'Noto Serif JP', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #D7CCC8;
  color: #2c3e50;
  width: 100%;
  -webkit-overflow-scrolling : touch;
}
.main-content {
  display: flex;
}
</style>
