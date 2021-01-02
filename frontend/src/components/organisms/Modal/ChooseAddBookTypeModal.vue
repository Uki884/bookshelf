<template>
  <Modal
    title="本を追加"
    @close="closeModal">
    <template slot="main">
      <div class="form">
        <div class="form-item">
          どちらの方法で本を追加しますか？
        </div>
      </div>
    </template>
    <template slot="footer">
      <div class="btn__wrapper">
        <common-button
          text="検索で追加"
          width="120px"
          @click="search()" />
        <common-button
          text="バーコードで追加"
          width="140px"
          @click="barcode()" />
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/atoms/BaseModal.vue'
import { mapGetters } from 'vuex'
import commonButton from "@/components/atoms/button/CommonButton.vue"

export default {
  components: {
    Modal,
    commonButton
  },
  props: {
    params: {
      type: Object,
      default: null
    }
  },
  methods: {
    closeModal() {
      ModalService.close()
    },
    search() {
      this.$modalService.addBook('AddBookSearchModal', this.params)
    },
    barcode() {
      this.$modalService.addBook('AddBookBarcodeModal', this.params)
    }
  }

}
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