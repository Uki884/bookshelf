<template>
  <GlobalProvide>
    <div id="app">
      <Index />
    </div>
  </GlobalProvide>
</template>

<script lang="ts">
import 'normalize.css'
import GlobalProvide from '@/components/Providers/GlobalProvider.vue'
import Index from '@/views/Index.vue'

import {
  defineComponent,
  SetupContext,
  reactive,
  computed,
} from "@vue/composition-api"

export default defineComponent({
  components: {
    GlobalProvide,
    Index
  },
  setup(props: any, context: SetupContext) {
    return {
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
html,body { height:100%; overflow: hidden; }
#app {
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
