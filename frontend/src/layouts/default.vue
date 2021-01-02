<template>
  <div class="default">
    <TheHeader />
    <router-view />
  </div>
</template>

<script lang="ts">
import TheHeader from '@/components/organisms/Header'
import { provideBook } from '@/store/bookStore.ts'

import {
  defineComponent,
  SetupContext,
  reactive,
  computed,
  onMounted
} from "@vue/composition-api"

export default defineComponent({
  components: {
    TheHeader,
  },
  setup(props: any, context: SetupContext) {
    provideBook(context)
  }
})
</script>

<style scoped>
.default {
  height: 100%;
}

</style>