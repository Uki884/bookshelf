<template>
  <div class="container">
    <img
      v-if="item.cover"
      :src="item.cover"
      class="cover-image"
      @click="selectBook(item)">
    <div
      v-if="isEdit"
      class="menu"
      @click="noBook ? addBook() : deleteBook(item)"
      v-text="noBook ? '追加する' : '削除する'" />
    <div
      v-if="visibleTitle"
      class="title">
      {{ item.title }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  reactive,
  computed,
} from "@vue/composition-api"

export default defineComponent({
  props: {
    item: {
      type: [Object, Array],
    },
    type: {
      type: String,
    },
    column: {
      type: Number,
    },
    row: {
      type: Number,
    },
    isEdit: {
      type: Boolean,
    },
    parentIndex: {
      type: Number,
    },
  },
  setup(props: any, context: SetupContext) {
    const state = reactive({
      visibleMenu: false,
      visibleAddMenu: false,
    })

    const noBook = computed(() => {
      return Object.keys(props.item).length <= 1
    })

    const deleteBook = (item: any) => {
      const payload = {
        item,
        column_no: props.column,
        row_no: props.row,
      }
      context.emit("deleteBook", payload)
    }

    const addBook = () => {
      const payload = {
        column_no: props.column,
        row_no: props.row
      }
      context.emit('addBook', payload)
    }

    const selectBook = (book: any) => {
      context.emit('selectBook', book)
    }

    const visibleTitle = computed(() => {
      switch (props.type) {
      case 'bookShelf':
        return false
      case 'bookList':
        return true
      default:
        return false
      }
    })

    return {
      state,
      noBook,
      deleteBook,
      addBook,
      selectBook,
      visibleTitle
    }
  },
})
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  .menu {
    position: absolute;
    top: 0;
    font-size: 13px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: whitesmoke;
    font-weight: bold;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.5);
  }
.cover-image {
  width: auto;
  height: 110px;
  cursor: pointer;
  .title {
    font-size: 12px;
  }
  .content{
      padding: 14px 0 0px 0px;
      height: 80%;
    }
  }
}

</style>