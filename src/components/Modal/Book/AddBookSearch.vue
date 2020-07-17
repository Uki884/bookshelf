<template>
  <Modal
    title="本を追加"
    @close="closeModal">
    <template slot="main">
      <SearchBox
        v-model="searchWord"
        :value="searchWord"
        @keydown.enter.native="handleSearch()"
        @click="handleSearch()" />
      <div class="select-list__wrapper">
        <ul>
          <li
            v-for="(book, index) in searchBooks"
            :key="index"
            @click="selectBook(index)">
            {{ book.title }}
          </li>
        </ul>
      </div>
    </template>
    <template slot="footer">
      <Pagination
        v-model="currentPage"
        :pagination="pagination"
        @click="handleSearch()" />
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/Modal.vue'
import ModalService from '@/services/modal/index.js'
import SearchBox from "@/components/Parts/CommonSearchBox.vue"
import Pagination from '@/components/Pagination.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    Modal,
    SearchBox,
    Pagination
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
      page: 1,
      currentPage: 1
    }
  },
  created() {
    this.$store.commit("book/clearSearchBooks")
    this.$store.commit("book/clearPagenation")
  },
  computed: {
    ...mapGetters({ searchBooks: 'book/searchBooks', pagination: 'book/pagination' }),
  },
  methods: {
    closeModal() {
      ModalService.close()
    },
    handleSearch(event) {
      const payload = {keyword: this.searchWord, page: this.currentPage}
      this.$store.dispatch('book/getSearchBook', payload)
    },
    selectBook(index) {
      const item = this.searchBooks[index]
      const payload = {...this.params, ...item}
      this.ModalService.selectBook(payload)
    },
    barcode() {
      this.ModalService.addBook('barcode', this.params)
    }
  }

}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/form.scss';
@import '@/assets/scss/btn.scss';

.select-list {

  &__wrapper {
    padding: 0 32px;
    overflow: scroll;
    height: calc(100% - 60px);
    ul {
      padding: 0px 14px;
        cursor: pointer;
    }
    li:first-child {
      border-top: solid 1px;
    }
    li {
      padding: 14px;
      border-bottom: solid 1px black;
      text-align: left;
      list-style: none;
      &:hover {
        background: #ECECEC;
      }
    }
  }
}

</style>