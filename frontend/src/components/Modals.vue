<template>
  <div>
    <component
      :is="modal.component"
      v-for="(modal, i) in modals"
      :key="i"
      :params="modal.params" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  reactive,
  computed,
  watchEffect,
  onMounted,
  watch
} from "@vue/composition-api"
import { useGrobalStore } from '@/store/grobalStore.ts'

export default defineComponent({
  props: {
    item: {
      type: [Object, Array],
    }
  },
  setup(props: any, context: SetupContext) {
    const grobalStore = useGrobalStore()

    const modals = computed(()=> {
      return context.root.$store.getters['modal/modals']
    })

    watch(modals, (modal, prevCount) => {
      const background = document.querySelector("#background") as HTMLElement
      if (background) {
        background.style.background = "rgba(0, 0, 0, 0.5)"
      }
    })

    return {
      modals
    }
  },
})
</script>

<style lang="scss" scoped>

</style>