<template>
  <div class="component">
    <div
      class="title">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">

import {
  defineComponent,
  SetupContext,
  reactive,
  computed,
  onMounted
} from "@vue/composition-api"

export default defineComponent({
  components: {
  },
  props: {
    title: {
      type: String,
      default: ''
    },
  },
  setup(props, context) {
  }
})
</script>

<style lang="scss" scoped>
  .component {
    .title {
      margin: 12px 0px;
      text-align: left;
      font-size: 20px;
      font-weight: bold;
    }
  }
</style>