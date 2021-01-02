<template>
  <div class="action-menu">
    <div class="content">
      <round-button
        text="本棚を追加する"
        width="92"
        @click="handleAddBookShelf" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext} from "@vue/composition-api"
import RoundButton from '@/components/atoms/button/BaseButton.vue'
export default defineComponent({
  components: {
    RoundButton
  },
  setup(props, ctx) {
    const handleAddBookShelf = () => {
      (ctx as any).root.$modalService.addBookShelf()
    }

    return {
      handleAddBookShelf
    }
  }
})
</script>

<style lang="scss" scoped>
.action-menu {
  height: 42px;
  width: 560px;
  margin: 0 auto;
  .content {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 8px;
  }
}

</style>