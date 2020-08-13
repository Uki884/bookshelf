<template>
  <Modal
    title="本を追加"
    @close="closeModal">
    <template slot="main">
      <div class="detect">
        <div class="detect__container">
          <div class="detect__image">
            <img :src="params.largeImageUrl">
          </div>
          <div class="detect__item">
            <div class="detect__text">
              <div class="detect__title">
                タイトル
              </div>
              <span>{{ params.title }}</span>
            </div>
            <div class="detect__text">
              <div class="detect__title">
                価格情報
              </div>
              <span>{{ params.itemPrice ? params.itemPrice + '円' : '価格情報がありません' }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <div class="btn__wrapper">
        <div
          class="btn btn--large"
          @click="closeModal()">
          検索結果に戻る
        </div>
        <div
          class="btn btn--large"
          @click="registBook()">
          この本を追加する
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import Modal from '@/components/Modal/Modal.vue'
import ModalService from '@/services/modal/index.js'
import { SetupContext, defineComponent } from '@vue/composition-api'
import { useUserStore } from '@/store/userStore.ts'
import { useBookShelfStore } from '@/store/bookShelfStore.ts'
import { useGrobalStore } from '@/store/grobalStore.ts'
import { useBookStore } from '@/store/bookStore'

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
    const { useGetUserBookShelf } = useBookShelfStore()
    const { useAddBook } = useBookStore()
    const { closeModal } = useGrobalStore()

    const registBook = async() => {
      const payload = {
        cover: props.params.largeImageUrl,
        author: props.params.author,
        title: props.params.title,
        price: props.params.itemPrice,
        publisher: props.params.publisherName,
        isbn: props.params.isbn,
        row_no: props.params.row_no,
        column_no: props.params.column_no,
        bookshelfId: props.params.bookShelf
      }

      await useAddBook(payload)
      await useGetUserBookShelf()
      await (context as any).root.ModalService.closeAll()
    }

    return {
      registBook,
      closeModal
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/form.scss';
@import '@/assets/scss/btn.scss';
@import '@/assets/scss/detect.scss';

/deep/ .Modal__body {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>