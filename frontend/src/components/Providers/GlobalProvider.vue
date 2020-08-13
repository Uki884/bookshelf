<template>
  <div class="provider">
    <slot />
  </div>
</template>

<script lang="ts">

import { provide, SetupContext, onMounted } from '@vue/composition-api'
import { provideUser } from '@/store/userStore.ts'
import { provideGrobal } from '@/store/grobalStore.ts'
import { provideBookShelf } from '@/store/bookShelfStore.ts'
import { provideBook } from '@/store/bookStore.ts'
export default {
  setup(_: any, context: SetupContext) {
    provideUser(context)
    provideGrobal(context)
    provideBookShelf(context)
    provideBook(context)
  },
}
</script>

<style scoped lang="scss">
.provider {
  height: 100%;
}
</style>