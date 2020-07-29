<template>
  <Modal
    title="バーコードで登録"
    @close="closeModal">
    <template slot="main">
      <div class="empty">
        <div
          v-if="bookAreaState.searchResult"
          class="empty__text">
          本が見つかりました！
        </div>
      </div>
      <div
        v-show="isCapturing && !bookAreaState.searchResult"
        id="interactive"
        class="viewport">
        <div class="detect-area" />
      </div>
      <div
        v-if="bookAreaState.searchResult && bookAreaState.isDetected"
        class="detect">
        <div class="detect__container">
          <div class="detect__image">
            <img :src="book.cover">
          </div>
          <div class="detect__item">
            <div class="detect__text">
              <div class="detect__title">
                タイトル
              </div>
              <span>{{ book.title }}</span>
            </div>
            <div class="detect__text">
              <div class="detect__title">
                価格情報
              </div>
              <span>{{ book.price ? book.price + '円' : '価格情報がありません' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="!bookAreaState.searchResult && bookAreaState.isDetected"
        class="detect__no-result">
        <div>本の情報がみつかりませんでした</div>
      </div>
    </template>
    <template slot="footer">
      <div
        v-if="bookAreaState.isDetected"
        class="btn__wrapper">
        <div
          class="btn btn--large"
          @click="start()">
          撮りなおす
        </div>
        <div
          class="btn btn--large"
          @click="registBook()"
          v-text="bookAreaState.searchResult ? 'この本を追加する': '検索で見つける'" />
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/Modal.vue'
import ModalService from '@/services/modal/index.js'
import { Caputure } from '@/utils/BarcodeScanner.js'
import { mapGetters } from 'vuex'

let caputure = new Caputure()
export default {
  components: {
    Modal
  },
  props: {
    params: {
      type: Object
    }
  },
  data() {
    return {
      input: {
        name: {
          name: '名前',
          value: '',
          length: [1, 28],
          require: true,
          errorMessage: []
        },
      },
      isCapturing: false
    }
  },
  computed: {
    ...mapGetters({ bookAreaState: 'book/bookAreaState', book: 'book/book' }),
  },
  watch: {
    'bookAreaState.isDetected': {
      handler(newValue) {
        this.isCapturing = !newValue
      }
    }
  },
  mounted() {
    this.start()
  },
  beforeDestroy() {
    caputure.CaptureStop()
  },
  methods: {
    closeModal() {
      caputure.CaptureStop()
      ModalService.close()
    },
    start() {
      this.$store.commit("book/clearBook")
      caputure.CaptureStart()
      this.isCapturing = true
    },
    stop() {
      caputure.CaptureStop()
      this.isCapturing = !this.isCapturing
    },
    registBook() {
      console.log(this.params)
      this.$store.dispatch('book/addBook', this.params).then(async Response =>{
        this.closeModal()
      })
    }
  }

}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/form.scss';
@import '@/assets/scss/btn.scss';
@import '@/assets/scss/detect.scss';

.Modal__body {
  height: calc(100% - 180px) !important;
}
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

</style>