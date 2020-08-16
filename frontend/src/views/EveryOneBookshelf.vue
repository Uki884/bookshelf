<template>
  <div class="bookshelfs">
    <BookShelf
      v-for="(bookshelf, index) in state.bookshelfs"
      :key="index"
      :bookshelf="bookshelf" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, provide, inject, SetupContext, watch, watchEffect, onMounted} from "@vue/composition-api"
import { useUserStore } from '@/store/userStore'
import { useBookShelfStore } from '@/store/bookShelfStore.ts'
import BookShelf from '@/components/EveryOneBookShelf/BookShelf.vue'

export default defineComponent({
  components: {
    BookShelf
  },
  setup(props, context) {
    const { useGetAllBookshelfs, useSetBookShelf} = useBookShelfStore()
    const state = reactive({
      bookshelfs: null
    })
    onMounted(async ()=> {
      const bookshelfs = await useGetAllBookshelfs()
      state.bookshelfs = await useSetBookShelf(bookshelfs)
    })

    return {
      state
    }
  }
})
</script>

<style lang="scss" scoped>
.bookshelfs {
    width: 100%;
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    overflow: scroll;
    zoom: 90%;
  @media screen and (min-width: 1000px) {
    margin-left: 400px;
    zoom: 70% !important;
  }
}
/deep/ .bookshelf {
  @media screen and (min-width: 1000px) {
    width: 33% !important;
  }
}
</style>