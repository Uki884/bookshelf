import {
  reactive,
  SetupContext,
  InjectionKey,
  toRefs,
  ref
} from "@vue/composition-api"

import { RepositoryFactory } from "@/api/Factory/index.js"
import BookUtil from "@/utils/BookUtli"
import { useGrobalStore } from "@/store/grobalStore.ts"

const BOOKSHELF_SELECT_MENU = [
  { id: 1, name: "本を追加/削除" },
  { id: 2, name: "本の位置を変更" },
  { id: 3, name: "本棚を削除", color: "red" },
]

const swiperOption = {
  centeredSlides: true,
  noSwipingSelector: ".cover-image",
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1430: {
      slidesPerView: 1,
      spaceBetween: 1,
    },
    950: {
      slidesPerView: 1,
    },
  },
}

export default function useBookShelf(context: SetupContext) {
  const userRepository = RepositoryFactory.get("user")

  const state: any = reactive({
    bookShelfs: [],
    editBookPositions: []
  })

  const bookShelfs = ref([])

  const useGetUserBookShelf = async (userId: any) => {
    await userRepository.getUserBook(userId).then((Response: any) => {
      const bookData = Response.data.map((item: any) => {
        const bookShelf = { books: null, description: "", id: null, name: '' }
        bookShelf.books = BookUtil.createBookArray(item)
        bookShelf.description = item.description
        bookShelf.id = item.id
        bookShelf.name = item.name
        return bookShelf
      })
      const bookShelf = bookData.map((item: any) => {
        return BookUtil.setBookShelf(item)
      })
      bookShelfs.value = bookShelf
    })
  }

  const useHandleChangePositionMode = (state: any, flag: boolean) => {
    state.isEditPositionMode = flag
  }

  const useAddBookShelfRow = (bookShelf: any) => {
    const emptyBooks = [{}, {}, {}, {}]
    bookShelf.books.push(emptyBooks)
    return state
  }

  const useSaveBooksPosition = () => {
    (context as any).root.ModalService.changeBookPositionComfirm(state.editBookPositions)
  }

  //移動した本の位置を保存
  const useSetBookPosition = (
    changedPosition: { id?: number; column_no: number; row_no: number },
    draggedBookId: number,
    targetPosition: { id?: number; column_no: number; row_no: number },
    targetBookId: number
  ) => {
    const draggedIndex = state.editBookPositions.findIndex(
      (item: any) => item.id == draggedBookId
    )
    const targetIndex = state.editBookPositions.findIndex(
      (item: any) => item.id == targetBookId
    )
    if (draggedIndex >= 0) {
      state.editBookPositions.splice(draggedIndex, 1, changedPosition)
    } else if (draggedIndex == -1) {
      state.editBookPositions.push(changedPosition)
    }
    if (targetBookId) {
      if (targetIndex >= 0) {
        state.editBookPositions.splice(targetIndex, 1, targetPosition)
      } else if (targetIndex == -1) {
        state.editBookPositions.push(targetPosition)
      }
    }
  }
  return {
    state,
    bookShelfs,
    swiperOption,
    BOOKSHELF_SELECT_MENU,
    useGetUserBookShelf,
    useHandleChangePositionMode,
    useAddBookShelfRow,
    useSaveBooksPosition,
    useSetBookPosition,
  }
}
