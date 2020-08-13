<template>
  <Modal
    title="本棚を作成"
    @close="closeModal">
    <template slot="main">
      <div class="form">
        <text-field
          v-model="state.input.name.value"
          :value="state.input.name.value"
          :name="state.input.name.name"
          :error-message="state.input.name.errorMessage"
          :required="state.input.name.require" />
        <text-field
          v-model="state.input.description.value"
          :value="state.input.description.value"
          :name="state.input.description.name"
          :error-message="state.input.description.errorMessage"
          :required="state.input.description.require" />
      </div>
    </template>
    <template slot="footer">
      <div
        class="btn btn--large"
        @click="addBookShelf()">
        作成する
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
    const { useCreateBookShelf, useGetUserBookShelf } = useBookShelfStore()
    const { closeModal } = useGrobalStore()
    const state = reactive({
      input: {
        name: {
          name: '名前',
          value: '',
          length: [1, 32],
          require: true,
          errorMessage: []
        },
        description: {
          name: '本棚の説明',
          value: '',
          length: [1, 32],
          require: false,
          errorMessage: []
        },
      },
    })
    const addBookShelf = async() => {
      const result = validation(state.input)
      if (result.validStatus) {
        const payload = requestInput(state.input)
        await useCreateBookShelf(payload)
        await useGetUserBookShelf()
        await closeModal()
      }
    }

    return {
      state,
      addBookShelf,
      closeModal
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/form.scss';
@import '@/assets/scss/btn.scss';
</style>