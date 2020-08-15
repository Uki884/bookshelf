<template>
  <div
    class="bookshelf"
    @click.self="handleEdit(false)">
    <div class="bookshelf__container">
      <div class="bookshelf__head">
        <div class="bookshelf__head__text">{{ bookShelf.information.name }}</div>
        <div class="btn__wrapper">
          <div class="bottom_buttons bookshelf__bottom-botton">
            <RoundButton
              v-if="state.isEditMode"
              width="120"
              text="本の追加をやめる"
              @click.native="handleEdit(false)" />
            <RoundButton
              v-if="state.isEditPositionMode"
              width="120"
              text="現在の本の位置を保存"
              @click.native="saveBookPosition()" />
            <RoundButton
              width="90"
              v-if="!state.isEditPositionMode"
              text="本棚の行を追加"
              @click.native="useAddBookShelfRow(bookShelf)" />
          </div>
          <RoundButton
            v-if="!state.isEditMode"
            width="90"
            :is-open="state.isOpenMenu"
            :options="BOOKSHELF_SELECT_MENU"
            :use-select="true"
            text="メニュー"
            @mouseleave.native="handleOpen(false)"
            @mouseover.native="handleOpen(true)"
            @click="handleAction" />
        </div>
      </div>
      <div class="bookshelf__wrapper">
        <div v-if="bookShelf.books.length" class="bookshelf__outer" >
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
            class="bookshelf__line seam" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, reactive, SetupContext, computed} from "@vue/composition-api"
import BookShelf from '@/components/BookShelf/BookShelf.vue'
import RoundButton from '@/components/Parts/RoundButton.vue'
import Books from '@/components/Book/Books.vue'

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { useUserStore } from '@/store/userStore.ts'
import { useBookShelfStore } from '@/store/bookShelfStore.ts'

//@ts-ignore
export default defineComponent({
  components: {
    BookShelf,
    Swiper,
    SwiperSlide,
    RoundButton,
    Books
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
    const { BOOKSHELF_SELECT_MENU, useAddBookShelfRow, state } = useBookShelfStore()

    const bookShelf = computed(() => {
      return props.bookShelf
    })

    const saveBookPosition =() => {
      (context as any).root.ModalService.changeBookPositionComfirm(state.editBookPositions)
    }

    const handleAction = (item: any) => {
      switch (item) {
      case 1:
        handleEdit(true)
        state.isOpenMenu = false
        break
      case 2:
        handleEditPosition(true)
        state.isOpenMenu = false
        break
      case 3:
        deleteBookShelf()
        state.isOpenMenu = false
      }
    }
    // 本棚編集モード
    const handleEdit = (flg: boolean) => {
      state.isEditPositionMode = false
      state.isEditMode = flg
    }

    //本の位置を変更
    const handleEditPosition = (flg: boolean) => {
      state.isEditMode = false
      state.isEditPositionMode = flg
    }

    // 本棚削除
    const deleteBookShelf = () => {
      (context as any).root.ModalService.deleteBookShelf(bookShelf.value.information)
    }

    const handleOpen = (flg: boolean) => {
      state.isOpenMenu = flg
    }

    return {
      state,
      handleOpen,
      handleEdit,
      handleAction,
      useAddBookShelfRow,
      saveBookPosition,
      BOOKSHELF_SELECT_MENU
    }
  }
})

</script>

<style lang="scss" scoped>
@import '@/assets/scss/btn.scss';
@import '@/assets/scss/bookshelf.scss';

.bottom_buttons {
  display: flex;
}

.btn__wrapper {
  justify-content: flex-end;
}
</style>