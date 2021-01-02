<template>
  <div class="action-menu">
    <div class="action-menu__content">
        <round-button text="本棚を追加する" width="92" @click="handleAddBookShelf"></round-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext} from "@vue/composition-api"
import ModalService from '@/services/modal/index.js'
import CommonButton from "@/components/Parts/CommonButton.vue"
import RoundButton from '@/components/Parts/RoundButton.vue'
export default defineComponent({
  components: {
    CommonButton,
    RoundButton
  },
  setup(props, ctx) {
    const handleAddBookShelf = () => {
      ModalService.addBookShelf()
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
  &__content {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 8px;
  }
}

</style>