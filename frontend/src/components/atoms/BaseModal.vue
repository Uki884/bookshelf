<template>
  <div
    id="background"
    class="background"
    @click.self="closeModal()">
    <div
      class="wrapper">
      <div class="header">
        <div class="title">
          {{ title }}
        </div>
        <div
          class="close"
          @click="closeModal()">
          <v-icon
            scale="2"
            name="times-circle" />
        </div>
      </div>
      <div class="body">
        <slot name="main" />
      </div>
      <div class="footer">
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
  methods: {
    closeModal() {
      this.$modalService.close()
    },
  }
}
</script>

<style lang="scss" scoped>
  .background{
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .title{
    font-size: 24px;
    padding-top: 12px;
    font-weight: bold;
  }
  .header {
    height: 60px;
    position: relative;
  }
  .footer {
    display: flex;
    justify-content: center;
    height: 60px;
  }
  .pagination {
    height: 60px;
    border-top: solid 1px;
  }
  .close {
    position: absolute;
    right: 16px;
    top: 10px;
    cursor: pointer;
  }
  .wrapper {
    border-radius: 6px;
    height: 600px;
    width: 600px;
    background: white;
    position: relative;
    margin: 16px;
  }
  .body {
    padding: 0 10%;
    height: calc(100% - 148px);
  }

</style>