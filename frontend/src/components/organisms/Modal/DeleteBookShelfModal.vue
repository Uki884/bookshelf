<template>
  <Modal
    title="本棚を削除"
    @close="closeModal">
    <template slot="main">
      <section>
        <div>本棚の本は全て削除されます。</div>
        <div>本棚を削除してもよろしいですか？</div>
      </section>
    </template>
    <template slot="footer">
      <div
        class="btn btn--large"
        @click="deleteBookShelf()">
        削除する
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import Modal from '@/components/atoms/BaseModal.vue'
import { mapGetters } from 'vuex'
import { SetupContext, defineComponent, reactive } from '@vue/composition-api'
import { useUserStore } from '@/store/userStore.ts'
import { useBookShelfStore } from '@/store/bookShelfStore.ts'
import { useGrobalStore } from '@/store/grobalStore.ts'

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
    const { useGetUserBookShelf, useDeleteBookShelf } = useBookShelfStore()
    const { closeModal } = useGrobalStore()

    const deleteBookShelf = async() => {
      await useDeleteBookShelf(Number(props.params.id))
      await useGetUserBookShelf(user.value.id)
      await closeModal()
    }

    return {
      deleteBookShelf,
      closeModal
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/form.scss';
@import '@/assets/scss/btn.scss';

</style>