<template>
  <div class="bookshelf">
    <div class="bookshelf__container">
      <div class="bookshelf__head">
        <BookShelfTitle :title="bookshelf.information.name" />
      </div>
      <div class="bookshelf__wrapper">
        <div class="bookshelf__outer">
          <Books
            v-for="(books, index) in bookshelf.books"
            :key="index"
            :books="books"
            :book-shelf="bookshelf.books"
            class="bookshelf__line seam" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, computed} from "@vue/composition-api"
import Books from '@/components/Book/Books.vue'
import BookShelfTitle from '@/components/Parts/BookshelfTitle.vue'

export default defineComponent({
  components: {
    Books,
    BookShelfTitle
  },
  props: {
    bookshelf: {
      type: Array,
      default: null
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/bookshelf.scss';

</style>