<template>
  <div
    class="booklist"
    :class="isOpen ? 'open': null">
    <div class="booklist__title">
      <v-icon
        :flip="isOpen ? 'vertical': 'horizontal'"
        scale="2"
        name="angle-right"
        @click="handleBookList()" />
      <span>本一覧</span>
    </div>
    <div class="booklist__contents">
      <img
        src="https://cover.openbd.jp/9784798141916.jpg"
        class="cover-image">
      <img
        src="https://cover.openbd.jp/9784798141916.jpg"
        class="cover-image">
      <img
        src="https://cover.openbd.jp/9784798141916.jpg"
        class="cover-image">
      <img
        src="https://cover.openbd.jp/9784798141916.jpg"
        class="cover-image">
      <img
        src="https://cover.openbd.jp/9784798141916.jpg"
        class="cover-image">
      <img
        src="https://cover.openbd.jp/9784798141916.jpg"
        class="cover-image">
      <img
        src="https://cover.openbd.jp/9784798141916.jpg"
        class="cover-image">
      <img
        src="https://cover.openbd.jp/9784798141916.jpg"
        class="cover-image">
      <img
        src="https://cover.openbd.jp/9784798141916.jpg"
        class="cover-image">
      <img
        src="https://cover.openbd.jp/9784798141916.jpg"
        class="cover-image">
      <img
        src="https://cover.openbd.jp/9784798141916.jpg"
        class="cover-image">
      <img
        src="https://cover.openbd.jp/9784798141916.jpg"
        class="cover-image">
      <img
        src="https://cover.openbd.jp/9784798141916.jpg"
        class="cover-image">
      <img
        src="https://cover.openbd.jp/9784798141916.jpg"
        class="cover-image">
      <!-- <div v-for="(book, index) in books" :key="index" class="booklist__content">
        <BookItem v-for="(item, index) in book" :key="index" :item="item" type="bookList"></BookItem>
      </div> -->
    </div>
  </div>
</template>

<script>
// import BookItem from '@/components/BookItem.vue';

export default {
  components: {
    // BookItem
  },
  props: {
    books: {
      type: Array
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    handleBookList() {
      this.isOpen = !this.isOpen
    }
  }

}
</script>

<style lang="scss">
.booklist{
    border-radius: 12px;
    width: 407px;
    background: #F5F5F5;
    position: absolute;
    margin-right: 24px;
    right: 0;
    top: 50%;
    height: 410px;
  &__title {
      padding-top: 14px;
      padding-bottom: 20px;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        width: 120px;
      }
      svg {
        position: absolute;
        left: 20px;
        cursor: pointer;
      }
    }
  &__contents {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    padding: 4px 24px;
    overflow: scroll;
    height: calc(100% - 94px);
  }
  &__content {
    display: flex;
  }
}

.open {
  width: 90%;
  max-width: 800px;
}

</style>