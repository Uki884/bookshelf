<template>
  <Modal
    title="この本について"
    @close="closeModal">
    <template slot="main">
      <div class="detect">
        <div class="detect__container">
          <div class="detect__image">
            <img :src="params.cover">
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
              <span>{{ params.price ? params.price + '円' : '価格情報がありません' }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer" />
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/Modal.vue'
import ModalService from '@/services/modal/index.js'

import { mapGetters } from 'vuex'

export default {
  components: {
    Modal,
  },
  props: {
    params: {
      type: Object
    }
  },
  data() {
    return {
      selectBookId: null,
      searchWord: '',
      page: 1
    }
  },
  methods: {
    closeModal() {
      ModalService.close()
    },
  }
}
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