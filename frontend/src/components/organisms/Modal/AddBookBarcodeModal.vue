<template>
  <Modal
    title="バーコードで登録"
    @close="closeModal">
    <template slot="main">
      <ModalContent>
      <div
        v-if="!isDetected"
        id="interactive"
        class="viewport">
        <div class="detect-area" />
      </div>
      <div
        class="detect">
        <div
          v-if="isDetected"
          class="detect__container">
          <div class="detect__image">
            <img :src="barcodeResult.cover">
          </div>
          <div class="detect__item">
            <div class="detect__text">
              <div class="detect__title">
                タイトル
              </div>
              <span>{{ barcodeResult.title }}</span>
            </div>
            <div class="detect__text">
              <div class="detect__title">
                価格情報
              </div>
              <span>{{ barcodeResult.price ? barcodeResult.price + '円' : '価格情報がありません' }}</span>
            </div>
          </div>
        </div>
      </div>
      </ModalContent>
    </template>
    <template slot="footer">
      <div
        class="btn__wrapper">
        <div
          v-if="isFailed"
          class="btn btn--large"
          @click="start()">
          撮りなおす
        </div>
        <div
          v-if="!isFailed && isDetected"
          class="btn btn--large"
          @click="registBook()">
          登録する
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, onMounted} from "@vue/composition-api"
import useBarcodeScanner from '@/composables/useBarcodeScanner'
import { useBookStore } from '@/store/bookStore'
import { useGrobalStore } from '@/store/grobalStore.ts'
import { useBookShelfStore } from '@/store/bookShelfStore.ts'
import { useUserStore } from '@/store/userStore'
import Modal from '@/components/atoms/BaseModal.vue'
import ModalContent from '@/components/atoms/ModalContent.vue'
export default defineComponent({
  components: {
    Modal,
    ModalContent
  },
  props: {
    params: {
      type: Object,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    const { useAddBook, state } = useBookStore()
    const { closeModal, closeAllModal } = useGrobalStore()
    const { useGetUserBookShelf } = useBookShelfStore()
    const { user } = useUserStore()
    const { CaptureStart, CaptureStop, barcodeResult, isDetected, isFailed} = useBarcodeScanner()

    const start = async() => {
      await CaptureStart()
      state.isCapturing = true
    }
    const stop = async() => {
      await CaptureStop()
      state.isCapturing = false
    }

    const registBook = async() => {
      const payload = {
        cover: barcodeResult.value.cover,
        author: barcodeResult.value.author,
        title: barcodeResult.value.title,
        price: barcodeResult.value.itemPrice,
        publisher: barcodeResult.value.publisher,
        isbn: barcodeResult.value.isbn,
        row_no: props.params.row_no,
        column_no: props.params.column_no,
        bookshelfId: props.params.bookShelf
      }
      await useAddBook(payload)
      await useGetUserBookShelf(user.value.id)
      await closeAllModal()
    }

    onMounted(()=>{
      start()
    })

    console.log(props)

    return {
      closeModal,
      registBook,
      state,
      isDetected,
      isFailed,
      start,
      barcodeResult
    }
  }
})
</script>

<style lang="scss" scoped>
#interactive{
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  height: 300px;
  width: 300px;
  z-index: 1;
  /deep/ video{
    width: 100%;
    height: 400px;
  }
    video, canvas {
    margin-top: -50px;
    width: 100%;
    height: 400px;
      z-index: 1;
  }
}
</style>