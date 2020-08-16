<template>
  <img v-if="isLoading" src="@/assets/loading.svg" />
</template>

<script lang="ts">
import {
  defineComponent,
} from "@vue/composition-api"

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style>

</style>