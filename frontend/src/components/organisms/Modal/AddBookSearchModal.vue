<template>
  <Modal
    title="本を追加"
    @close="closeModal">
    <template slot="main">
        <InputSearchBox
          v-model="state.searchWord"
          :value="state.searchWord"
          @keydown.enter.native="handleSearch()"
          @click="handleSearch()" />
      <div
        v-if="state.searchResult.length"
        class="select-list__wrapper">
        <ul>
          <li
            v-for="(book, index) in state.searchResult"
            :key="index"
            @click="selectBook(index)">
            {{ book.title }}
          </li>
        </ul>
      </div>
      <div
        v-else>
        検索結果がありません
      </div>
    </template>
    <template slot="footer">
      <Pagination
        v-model="state.currentPage"
        :pagination="state.searchPagenation"
        @click="handleSearch()" />
    </template>
  </Modal>
</template>

<script lang="ts">
import Modal from '@/components/atoms/BaseModal.vue'
import InputSearchBox from "@/components/molecules/InputSearchBox.vue"
import Pagination from '@/components/organisms/Pagination.vue'
import { SetupContext, defineComponent, reactive } from '@vue/composition-api'

import { mapGetters } from 'vuex'
import { useBookStore } from '@/store/bookStore'
import { RepositoryFactory } from '@/api/Factory'
import ModalContent from '@/components/atoms/ModalContent.vue'

export default defineComponent({
  components: {
    Modal,
    InputSearchBox,
    Pagination,
    ModalContent
  },
  props: {
    params: {
      type: Object
    }
  },
  setup(props: any, context: any) {
    const {state} = useBookStore()
    const rakutenApi = context.root.$RepositoryFactory.get('rakuten')

    const closeModal = () => {
      context.root.$modalService.close()
    }
    const handleSearch = async() => {
      const payload = {keyword: state.searchWord, page: state.currentPage}
      const data = await rakutenApi.getSearchBook(payload)
      const searchBooks = data.data.Items.map((data: any) => data.Item)
      const { count, first, last, page, pageCount } = data.data
      state.searchResult = searchBooks
      state.searchPagenation = { count, first, last, page, pageCount }
    }
    const selectBook = (index: number)=> {
      const item = state.searchResult[index]
      const payload = {...props.params, ...item}
      context.root.$modalService.selectBook(payload)
    }

    const barcode = () => {
      context.root.$modalService.addBook('barcode', props.params)
    }

    return {
      state,
      closeModal,
      handleSearch,
      selectBook,
      barcode
    }
  },
})
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/form.scss';
@import '@/assets/scss/btn.scss';

.select-list {
  &__wrapper {
    padding: 0 12px;
    overflow: scroll;
    height: calc(100% - 68px);
    ul {
      height: 100%;
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