<template>
  <div class="header">
    <div class="contents">
      <BookShelfLabel :title="bookShelf.information.name" />
      <div class="buttons">
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
          v-if="!state.isEditPositionMode"
          width="90"
          text="本棚の行を追加"
          @click.native="useAddBookShelfRow(bookShelf)" />
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
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  SetupContext,
  computed,
} from "@vue/composition-api"
import { useBookShelfStore } from "@/store/bookShelfStore.ts"
import RoundButton from '@/components/atoms/button/BaseButton.vue'
import BookShelfLabel from '@/components/atoms/labels/BookShelfLabel.vue'
export default defineComponent({
  components: {
    RoundButton,
    BookShelfLabel
  },
  props: {
    bookShelf: {
      type: Object,
      default: null
    },
  },
  setup(props, context) {
    const {
      BOOKSHELF_SELECT_MENU,
      useAddBookShelfRow,
      state,
    } = useBookShelfStore()

    const handleOpen = (flg: boolean) => {
      state.isOpenMenu = flg
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

    const handleEditBookshelfName = () => {
      (context as any).root.ModalService.changeBookShelfName(
        props.bookShelf.information
      )
    }

    // 本棚削除
    const deleteBookShelf = () => {
      (context as any).root.ModalService.deleteBookShelf(
        props.bookShelf.information
      )
    }

    const saveBookPosition = () => {
      (context as any).root.ModalService.changeBookPositionComfirm(
        state.editBookPositions
      )
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
        handleEditBookshelfName()
        state.isOpenMenu = false
        break
      case 4:
        deleteBookShelf()
        state.isOpenMenu = false
      }
    }

    return {
      state,
      handleOpen,
      handleEdit,
      handleAction,
      useAddBookShelfRow,
      saveBookPosition,
      BOOKSHELF_SELECT_MENU,
    }
  },
})
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: center;
    width: 100%;
    .contents {
      width: 100%;
      padding: 0 24px;
    }
    .text {
      text-align: left;
      font-size: 20px;
      font-weight: bold;
    }
    .buttons{
      display: flex;
      justify-content: flex-end;
    }
  }
  .bottom-botton {
    span {
      font-size: 12px;
      font-weight: bold;
      margin-right: 4px;
    };
    svg {
      vertical-align: bottom;
    }
  }
</style>