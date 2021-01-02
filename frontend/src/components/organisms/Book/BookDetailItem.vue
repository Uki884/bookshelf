<template>
  <div class="search">
    <div class="item">
      <div class="image">
        <img :src="bookCover">
      </div>
      <div class="text">
        <div class="title">
          タイトル
        </div>
        <span>{{ book.title }}</span>
      </div>
      <div class="text">
        <div class="title">
          価格情報
        </div>
        <span>{{ book.itemPrice ? book.itemPrice + '円' : '価格情報がありません' }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SetupContext, defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  props: {
    book: {
      type: Object,
      default: null
    }
  },
  setup(props, context) {
    const bookCover = computed(()=>{
      return props.book.cover ? props.book.cover : props.book.largeImageUrl
    })
    return {
      bookCover
    }
  }
})

</script>

<style lang="scss" scoped>
.search {
  text-align: left;
  padding: 0px 20px;
  height: 100%;
  .title {
    font-weight: bold;
    padding-bottom: 8px;
    font-size: 18px;
  }
  .text {
    font-size: 14px;
    padding-bottom: 24px;
  }
  .image {
    margin: 12px;
    display: flex;
    justify-content: center;
  }
}
</style>