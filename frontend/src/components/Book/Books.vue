<template>
  <draggable
    :list="books"
    :disabled="!isEditPosition"
    :options="state.options"
    :move="checkMove"
    @end="end"
    @clone="onclone">
    <div
      v-for="(item, index) in books"
      :key="index"
      class="bookshelf__item">
      <BookItem
        type="bookShelf"
        :index="index"
        :item="item"
        :column="column"
        :row="index"
        :is-edit="isEdit"
        :parent-index="parentIndex"
        @deleteBook="deleteBook"
        @selectBook="selectBook"
        @addBook="addBook" />
    </div>
  </draggable>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import BookItem from '@/components/Book/BookItem.vue'
import isMobile from 'ismobilejs'
import ModalService from '@/services/modal/index.js'
import { useBookShelfStore } from '@/store/bookShelfStore.ts'

import { defineComponent, reactive, provide, inject, SetupContext, watchEffect, computed} from "@vue/composition-api"

export default defineComponent({
  props: {
    books: {
      type: Array
    },
    bookShelf: {
      type: Array
    },
    isEdit: {
      type: Boolean
    },
    isEditPosition: {
      type: Boolean
    },
    column: {
      type: Number
    },
    bookShelfId: {
      type: Number
    },
    parentIndex: {
      type: Number
    },
    editBookPositions: {
      type: Array
    }
  },
  components: {
    draggable,
    BookItem
  },
  setup(props: any, context: SetupContext) {
    const bookShelfStore = useBookShelfStore()
    const { useSetBookPosition } = useBookShelfStore()

    const bookShelf = computed(()=> {
      return props.bookShelf
    })
    const books = computed(()=> {
      return props.books
    })

    const state = reactive({
      options: {
        handle: '.cover-image',
        group: 'BOOKS',
      },
      dragging: false,
      target: {
        line: 0,
        context: {},
        index: 0
      },
      dragged: {
        line: 0,
        context: {},
        index: 0
      },
    })

    const end = async() => {
      await setBookPosition()
      bookShelf.value[state.target.line].splice(state.target.index, 1, state.dragged.context)
      bookShelf.value[state.dragged.line].splice(state.dragged.index, 1, state.target.context)
      state.dragged = { line: 0, context: {}, index: 0}
      state.target = { line: 0, context: {}, index: 0}
    }

    const checkMove = (evt: any) => {
      const targetLine = parseInt(evt.to.id, 10)
      const draggedLine  = parseInt(evt.from.id, 10)
      const targetIndex = evt.relatedContext.index
      const targetContext = bookShelf.value[targetLine][targetIndex]
      state.target.line = targetLine
      state.target.context = targetContext
      state.target.index = targetIndex
      if (state.dragging) {
        return false
      }
    }

    const onclone = (evt: any) => {
      state.dragging = true
      const draggedLine = parseInt(evt.target.id, 10)
      const draggedIndex = evt.oldDraggableIndex
      const draggedContext = bookShelf.value[draggedLine][draggedIndex]
      state.dragged.line = draggedLine
      state.dragged.context = draggedContext
      state.dragged.index = draggedIndex
    }

    const setBookPosition = async () => {
      const targetBookId = bookShelf.value[state.target.line][state.target.index].position_id
      const draggedBookId = bookShelf.value[state.dragged.line][state.dragged.index].position_id
      const targetPosition = {
        id: targetBookId,
        column_no: state.dragged.line,
        row_no: state.dragged.index
      }
      const changedPosition = {
        id: draggedBookId,
        column_no: state.target.line,
        row_no: state.target.index
      }
      await useSetBookPosition(changedPosition, draggedBookId, targetPosition, targetBookId)
    }

    const deleteBook = (payload: any) => {
      (context as any).root.ModalService.deleteBook(payload)
    }

    const addBook = (payload: any) => {
      (context as any).root.ModalService.chooseAddBookType({ ...payload, bookShelf: props.bookShelfId })
    }

    const selectBook = (book: any) => {
      (context as any).root.ModalService.bookDetail(book)
    }

    return {
      state,
      end,
      checkMove,
      onclone,
      deleteBook,
      addBook,
      selectBook
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/bookshelf.scss';

.ghost{
  img {
    visibility:hidden;
  }
    outline-offset: -24px;
    outline: dotted 4px white;
}
.dragging {
  position: absolute;
}
</style>