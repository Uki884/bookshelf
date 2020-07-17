<template>
  <Modal
    title="本の位置を変更"
    @close="closeModal">
    <template slot="main">
      <div class="Modal__form">
        <div class="Modal__form-item">
          変更した本の位置を保存しますか？
        </div>
      </div>
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
import Modal from '@/components/Modal/Modal.vue'
import ModalService from '@/services/modal/index.js'
import { SetupContext, defineComponent } from '@vue/composition-api'
import { useGrobalStore } from '@/store/grobalStore.ts'

export default defineComponent({
  props: {
    params: {
      type: Array,
      default: null
    }
  },
  components: {
    Modal
  },
  setup(props: any, context: SetupContext) {
    const { closeModal } = useGrobalStore()

    const saveBookPosition = async() => {
      await context.root.$store.dispatch('book/saveBooksPosition', props.params)
      await context.root.$store.commit('book/setEditPosition', false)
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
@import 'src/assets/scss/form.scss';
@import '@/assets/scss/btn.scss';
</style>