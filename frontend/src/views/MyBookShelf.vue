<template>
  <div class="my-bookshelf">
    <Loading v-if="isLoading" />
    <swiper
      v-if="!isLoading"
      ref="mySwiper"
      :options="swiperOption">
      <swiper-slide
        v-for="(bookShelf, index) in bookShelfs"
        :key="'bookshelfs' + index"
        class="bookshelfs">
        <BookShelf
          :book-shelf="bookShelf"
          :parent-index="index" />
      </swiper-slide>
      <div
        slot="button-prev"
        class="swiper-button-prev swiper-button-white" />
      <div
        slot="button-next"
        class="swiper-button-next swiper-button-white" />
      <div
        slot="pagination"
        class="swiper-pagination" />
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, provide, inject, SetupContext, watch, watchEffect, onMounted} from "@vue/composition-api"
import BookShelf from '@/components/MyBookShelf/BookShelf.vue'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { useBookShelfStore } from '@/store/bookShelfStore.ts'

import { useUserStore } from '@/store/userStore'
import { useAsync } from '@/utils/useAsync'
import Loading from '@/components/Loading.vue'

export default defineComponent({
  components: {
    BookShelf,
    Swiper,
    SwiperSlide,
    Loading
  },
  setup(props: any, context: SetupContext) {
    const { bookShelfs, swiperOption, useGetUserBookShelf, useSetBookShelf } = useBookShelfStore()
    const { useGetCurrentUser, user, isUserLoggedIn, isLoading } = useUserStore()

    return {
      isLoading,
      bookShelfs,
      swiperOption,
    }
  }
})

</script>

<style lang="scss" scoped>
.my-bookshelf {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  overflow: hidden;
}

.bookshelfs{
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.swiper-pagination-bullets {
    // bottom: 20%;
}

.swiper-pagination {
  /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background-color: black;
  }
}

.swiper-container{
  width: 100%;
  height: 100%;
}

</style>
