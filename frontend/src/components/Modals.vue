<template>
  <div>
    <component
      :is="modal.component"
      v-for="(modal, i) in modals"
      :key="i"
      :params="modal.params" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  reactive,
  computed,
  watchEffect,
  onMounted,
  watch
} from "@vue/composition-api"

import { useGrobalStore } from '@/store/grobalStore.ts'

import Barcode from '@/components/organisms/Modal/AddBookBarcodeModal.vue'
import Search from "@/components/organisms/Modal/AddBookSearchModal.vue"
import DeleteBook from "@/components/organisms/Modal/DeleteBookModal.vue"
import DeleteBookShelf from '@/components/organisms/Modal/DeleteBookShelfModal.vue'
import AddBookShelf from '@/components/organisms/Modal/AddBookShelfModal.vue'
import ChangeBookPositionComfirm from "@/components/organisms/Modal/changeBookPositionComfirmModal.vue"
import ChooseAddBookType from '@/components/organisms/Modal/ChooseAddBookTypeModal.vue'
import SelectBook from "@/components/organisms/Modal/SelectBookModal.vue"
import BookDetailItem from "@/components/organisms/Modal/BookDetailItemModal.vue"
import ChangeBookShelfName from '@/components/organisms/Modal/ChangeBookShelfNameModal.vue'

export default defineComponent({
  components: {
    AddBookShelf,
    Barcode,
    Search,
    DeleteBook,
    DeleteBookShelf,
    ChangeBookPositionComfirm,
    ChooseAddBookType,
    SelectBook,
    BookDetailItem,
    ChangeBookShelfName
  },
  props: {
    item: {
      type: [Object, Array],
    }
  },
  setup(props: any, context: SetupContext) {
    const modals = computed(()=> {
      return context.root.$store.getters['modal/modals']
    })

    watch(modals, (modal, prevCount) => {
      const background = document.querySelector("#background") as HTMLElement
      if (background) {
        background.style.background = "rgba(0, 0, 0, 0.5)"
      }
    }, {immediate: true})

    return {
      modals
    }
  },
})
</script>

<style lang="scss" scoped>

</style>