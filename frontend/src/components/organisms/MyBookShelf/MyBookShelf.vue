<template>
  <div
    class="bookshelf"
    @click.self="useHandleEdit(false)">
      <MyBookShelfHeader :bookShelf="bookShelf"  />
      <div
        v-if="bookShelf.books.length"
        class="outer">
        <Books
          v-for="(item, index) in bookShelf.books"
          :id="index"
          :key="index"
          :books="item"
          :book-shelf="bookShelf.books"
          :book-shelf-id="bookShelf.information.id"
          :parent-index="parentIndex"
          :is-edit="state.isEditMode"
          :is-edit-position="state.isEditPositionMode"
          :column="index"
          class="line seam" />
      </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, reactive, SetupContext, computed} from "@vue/composition-api"
import RoundButton from '@/components/atoms/button/BaseButton.vue'
import Books from '@/components/organisms/Books'

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { useUserStore } from '@/store/userStore.ts'
import { useBookShelfStore } from '@/store/bookShelfStore.ts'
import MyBookShelfHeader from '@/components/molecules/MyBookShelfHeader.vue'

//@ts-ignore
export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    RoundButton,
    Books,
    MyBookShelfHeader
  },
  props: {
    bookShelf: {
      type: Object,
    },
    parentIndex: {
      type: Number,
    }
  },
  setup(props: any, context: SetupContext) {
    const { user } = useUserStore()
    const { BOOKSHELF_SELECT_MENU, useAddBookShelfRow, state,useHandleEdit } = useBookShelfStore()

    const bookShelf = computed(() => {
      return props.bookShelf
    })

    return {
      state,
      useHandleEdit,
    }
  }
})

</script>

<style lang="scss" scoped>
@import '@/assets/scss/btn.scss';
.bookshelf {
  width: 100%;
  height: calc(100vh - 212px);
  margin-top: 4px;
.container{
  height: calc(100% - 200px);
  position: relative;
  width: 100%;
    display: flex;
    justify-content: center;
}

}

.bottom_buttons {
  display: flex;
}

.btn__wrapper {
  justify-content: flex-end;
}

.outer {
    overflow: scroll;
    height: 100%;
    margin: 20px 0;
    box-shadow: 0 0 0 15px #604737;
    filter:blur(0);
    height: 100%;
    display: flex;
    background-color: #271d16;
    width: 500px;
    margin: 24px auto;
    overflow: scroll;
    flex-wrap: wrap;
    @media screen and (max-width: 480px) {
      width: calc(100% - 40px) !important;
    }

}
  .line {
    position: relative;
    display: flex;
    width: 100%;
    padding: 12px 0;
    background: #271d16;
    border-bottom: solid 10px #604737;
    box-shadow: 14px 1px 17px 12px #120e0b inset;
  }

.seam {
  &::before {
    content: "";
    background: black;
    height: 1px;
    display: inherit;
    position: absolute;
    top: -10px;
    left: 1px;
    width: 10px;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }
  &::after{
    content: "";
    background: black;
    height: 1px;
    display: inherit;
    position: absolute;
    top: -10px;
    right: -10px;
    width: 10px;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
}
</style>