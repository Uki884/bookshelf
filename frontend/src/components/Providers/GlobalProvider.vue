<template>
  <div class="provider">
    <slot />
  </div>
</template>

<script lang="ts">

import { provide, SetupContext, onMounted, defineComponent } from '@vue/composition-api'
import { provideUser } from '@/store/userStore'
import { provideGrobal } from '@/store/grobalStore'

export default defineComponent({
  setup(_: any, context: SetupContext) {
    provideUser(context)
    provideGrobal(context)
  },
})
</script>

<style scoped lang="scss">
.provider {
  height: 100%;
}
</style>