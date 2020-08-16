<template>
  <div class="search">
    <div class="search__item">
      <div class="search__image">
        <img :src="bookCover">
      </div>
      <div class="search__text">
        <div class="search__title">
          タイトル
        </div>
        <span>{{ book.title }}</span>
      </div>
      <div class="search__text">
        <div class="search__title">
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
  &__title {
    font-weight: bold;
    padding-bottom: 8px;
  }
  &__text {
    font-size: 18px;
    padding-bottom: 6px;
  }
  &__image {
    margin: 12px;
    display: flex;
    justify-content: center;
  }
}
</style>