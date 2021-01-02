<template>
  <Modal
    title="本を削除"
    @close="closeModal">
    <template slot="main">
      <div class="Modal__form">
        <div class="Modal__form-item">
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

#interactive{
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  height: 300px;
  width: 300px;
  z-index: 1;
    video, canvas {
    margin-top: -50px;
    width: 300px;
    height: 400px;
      z-index: 1;
  }
}

.detect {
  &__no-result {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
  }
  &__container {
      display: flex;
      height: 320px;
  }
  &__image {
    width: 50%;
    img {
      height: auto;
      width: 175px;
    }
  }
  &__item {
    width: 50%;
  }
  &__text {
    width: 260px;
    margin: 0 0 auto;
    text-align: left;
    margin-bottom: 16px;
    span {
      padding: 16px;
    }
  }
  &__title {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    padding: 12px;
  }
}
.empty{
  width: 200px;
  height: 50px;
  margin: 24px auto;
  &__text {
    color: tomato;
    font-weight: bold;
    font-size: 20px;
  }
}

  .detect-area {
    position: absolute;
    top: 30%;
    bottom: 30%;
    left: 10%;
    right: 10%;
    z-index: 2;
    border: 2px solid #0000ff;
  }

</style>