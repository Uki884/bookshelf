<template>
  <GlobalProvider>
    <defaultLayout />
    <Modals />
  </GlobalProvider>
</template>

<script lang="ts">
import 'normalize.css'
import GlobalProvider from '@/components/Providers/GlobalProvider.vue'
import defaultLayout from '@/layouts/default.vue'
import Modals from '@/components/Modals.vue'

import {
  defineComponent,
  SetupContext,
  reactive,
  computed,
} from "@vue/composition-api"

export default defineComponent({
  components: {
    GlobalProvider,
    defaultLayout,
    Modals
  },
  setup(props: any, context: SetupContext) {
    return {
    }
  }
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Serif+JP&display=swap');
body {
  overscroll-behavior: none;
  width: 100%;
}
html,body {
  overflow: hidden;
  height: 100%;
  width: 100%;
  font-family: 'Noto Serif JP', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #D7CCC8;
  color: #2c3e50;
  overflow: scroll;
  -webkit-overflow-scrolling : touch;
}
.main-content {
  display: flex;
  height: calc(100% - 56px);
}
</style>
