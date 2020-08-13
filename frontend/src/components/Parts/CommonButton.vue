<template>
  <div
    class="btn"
    :style="'width:' + width"
    @click="click">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    text: {
      type: String
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }

}
</script>

<style lang="scss" scoped>
</style>