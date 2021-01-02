<template>
  <div class="form">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext} from "@vue/composition-api"

export default defineComponent({
  setup(props, context: SetupContext) {
  }

})
</script>

<style lang="scss" scoped>

.form {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  font-size: 18px;
}

</style>