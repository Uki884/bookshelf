<template>
  <Modal
    title="本の位置を変更"
    @close="closeModal">
    <template slot="main">
      <ModalContent>
        変更した本の位置を保存しますか？
      </ModalContent>
    </template>
    <template slot="footer">
      <div
        class="btn btn--large"
        @click="saveBookPosition()">
        保存する
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import Modal from '@/components/atoms/BaseModal.vue'
import { SetupContext, defineComponent } from '@vue/composition-api'
import { useGrobalStore } from '@/store/grobalStore.ts'
import { useBookShelfStore } from '@/store/bookShelfStore'
import ModalContent from '@/components/atoms/ModalContent.vue'

export default defineComponent({
  props: {
    params: {
      type: Array,
      default: null
    }
  },
  components: {
    Modal,
    ModalContent
  },
  setup(props: any, context: SetupContext) {
    const { closeModal } = useGrobalStore()
    const { useSaveBooksPosition } = useBookShelfStore()
    const saveBookPosition = async() => {
      await useSaveBooksPosition(props.params)
      await closeModal()
    }

    return {
      closeModal,
      saveBookPosition
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/btn.scss';
</style>