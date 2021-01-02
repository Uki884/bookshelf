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

import AddBookBarcodeModal from '@/components/organisms/Modal/AddBookBarcodeModal.vue'
import AddBookSearchModal from "@/components/organisms/Modal/AddBookSearchModal.vue"
import DeleteBookModal from "@/components/organisms/Modal/DeleteBookModal.vue"
import DeleteBookShelfModal from '@/components/organisms/Modal/DeleteBookShelfModal.vue'
import AddBookShelfModal from '@/components/organisms/Modal/AddBookShelfModal.vue'
import ChangeBookPositionComfirmModal from "@/components/organisms/Modal/ChangeBookPositionComfirmModal.vue"
import ChooseAddBookTypeModal from '@/components/organisms/Modal/ChooseAddBookTypeModal.vue'
import SelectBookModal from "@/components/organisms/Modal/SelectBookModal.vue"
import BookDetailItemModal from "@/components/organisms/Modal/BookDetailItemModal.vue"
import ChangeBookShelfNameModal from '@/components/organisms/Modal/ChangeBookShelfNameModal.vue'

export default defineComponent({
  components: {
    AddBookShelfModal,
    AddBookSearchModal,
    DeleteBookModal,
    DeleteBookShelfModal,
    ChangeBookPositionComfirmModal,
    ChooseAddBookTypeModal,
    SelectBookModal,
    BookDetailItemModal,
    ChangeBookShelfNameModal
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