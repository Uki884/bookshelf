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

import Barcode from '@/components/organisms/Modal/Book/AddBookBarcode.vue'
import Search from "@/components/organisms/Modal/Book/AddBookSearch.vue"
import DeleteBook from "@/components/organisms/Modal/Book/DeleteBook.vue"
import DeleteBookShelf from '@/components/organisms/Modal/BookShelf/DeleteBookShelf.vue'
import AddBookShelf from '@/components/organisms/Modal/BookShelf/AddBookShelf.vue'
import ChangeBookPositionComfirm from "@/components/organisms/Modal/ChangePosition/changeBookPositionComfirm.vue"
import ChooseAddBookType from '@/components/organisms/Modal/Book/ChooseAddBookType.vue'
import SelectBook from "@/components/organisms/Modal/Book/SelectBook.vue"
import BookDetail from "@/components/organisms/Modal/Book/BookDetail.vue"
import ChangeBookShelfName from '@/components/organisms/Modal/BookShelf/ChangeBookShelfName.vue'

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
    BookDetail,
    ChangeBookShelfName
  },
  props: {
    item: {
      type: [Object, Array],
    }
  },
  setup(props: any, context: SetupContext) {
    const grobalStore = useGrobalStore()

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