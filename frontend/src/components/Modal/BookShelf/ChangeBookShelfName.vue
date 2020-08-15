<template>
  <Modal
    title="本棚の名前を変更"
    @close="closeModal">
    <template slot="main">
      <div class="form">
        <text-field
          v-model="state.input.name.value"
          :value="state.input.name.value"
          :name="state.input.name.name"
          :error-message="state.input.name.errorMessage"
          :required="state.input.name.require" />
      </div>
    </template>
    <template slot="footer">
      <div
        class="btn btn--large"
        @click="changeBookShelfName()">
        この名前に変更する
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { SetupContext, defineComponent, reactive } from '@vue/composition-api'
import { useUserStore } from '@/store/userStore'
import { useBookShelfStore } from '@/store/bookShelfStore'
import { useGrobalStore } from '@/store/grobalStore'
import { validation, requestInput } from "@/utils/validation"
import Modal from '@/components/Modal/Modal.vue'

export default defineComponent({
  props: {
    params: {
      type: Object,
      default: null
    }
  },
  components: {
    Modal
  },
  setup(props: any, context: SetupContext) {

    const { user } = useUserStore()
    const { useChangeBookshelfName, useGetUserBookShelf} = useBookShelfStore()
    const { closeModal } = useGrobalStore()
    const state = reactive({
      input: {
        name: {
          name: '新しい名前',
          value: props.params.name,
          length: [1, 32],
          require: true,
          errorMessage: []
        }
      },
    })
    const changeBookShelfName = async() => {
      const result = validation(state.input)
      if (result.validStatus) {
        const input = requestInput(state.input)
        const payload = {
          ...input,
          id: props.params.id
        }
        await useChangeBookshelfName(payload)
        await useGetUserBookShelf(user.value.id)
        await closeModal()
      }
    }

    return {
      state,
      changeBookShelfName,
      closeModal
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/form.scss';
@import '@/assets/scss/btn.scss';
</style>