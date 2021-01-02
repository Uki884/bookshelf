<template>
  <div
    id="background"
    class="Modal__background"
    @click.self="$emit('close')">
    <div
      class="Modal__wrapper"
      :style="modalSize">
      <div class="Modal__header">
        <div class="Modal__title">
          {{ title }}
        </div>
        <div
          class="Modal__close"
          @click="closeModal">
          <v-icon
            scale="2"
            name="times-circle" />
        </div>
      </div>
      <div class="Modal__body">
        <slot name="main" />
      </div>
      <div class="Modal__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      size: ''
    }
  },
  computed: {
    modalSize() {
      const modalSize = `width: ${this.size}%;`
      return modalSize
    }
  },
  mounted() {
    if (this.isMobile()) {
      let client_w = document.querySelector(".Modal__wrapper").clientWidth
      const size = (client_w * 2 / 100)
      this.size = 100 - size
    }
  },
  methods: {
    closeModal() {
      this.$modalService.close()
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/modal.scss';

</style>