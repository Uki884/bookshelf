<template>
  <Modal
    title="この本について"
    @close="closeModal">
    <template slot="main">
      <BookDetailItem :book="params" />
    </template>
    <template slot="footer" />
  </Modal>
</template>

<script>
import Modal from '@/components/atoms/BaseModal.vue'
import BookDetailItem from '@/components/organisms/Book/BookDetailItem.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    Modal,
    BookDetailItem
  },
  props: {
    params: {
      type: Object,
      default: null
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
      this.$modalService.close()
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