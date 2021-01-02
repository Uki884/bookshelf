<template>
  <Modal
    title="本を削除"
    @close="closeModal">
    <template slot="main">
      <div class="form">
        <div class="form-item">
          本棚から本を削除してもよろしいですか？
        </div>
      </div>
    </template>
    <template slot="footer">
      <div
        class="btn btn--large"
        @click="deleteBook()">
        削除する
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import Modal from '@/components/atoms/BaseModal.vue'
import { mapGetters } from 'vuex'
import { SetupContext, defineComponent } from '@vue/composition-api'
import { useUserStore } from '@/store/userStore.ts'
import { useBookShelfStore } from '@/store/bookShelfStore.ts'
import { useGrobalStore } from '@/store/grobalStore.ts'
import { useBookStore } from '@/store/bookStore'

export default defineComponent({
  components: {
    Modal
  },
  props: {
    params: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const { user } = useUserStore()
    const { useGetUserBookShelf } = useBookShelfStore()
    const { useAddBook, useDeleteBook } = useBookStore()
    const { closeModal } = useGrobalStore()

    const deleteBook = async() => {
      const bookId = props.params.item.book_id ? Number(props.params.item.book_id) : null
      await useDeleteBook(bookId)
      await useGetUserBookShelf(user.value.id)
      await closeModal()
    }

    return {
      closeModal,
      deleteBook
    }
  },
})
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/form.scss';
@import '@/assets/scss/btn.scss';

.form{
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  font-size: 18px;
}

</style>