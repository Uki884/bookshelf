import {
  reactive,
  SetupContext,
  ref
} from "@vue/composition-api"

import BookUtil from "@/utils/BookUtli"
import { CREATE_BOOKSHELF } from '@/apollo/mutations/createBookShelf.ts'
import { GET_USER_BOOKSHELFS } from '@/apollo/queries/getUserBookshelfs.ts'

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
  const state: any = reactive({
    bookShelfs: [],
    editBookPositions: []
  })

  const bookShelfs = ref([])

  const useSetBookShelf = async (bookshelf: any) => {
    const bookData = bookshelf.map(item => {
      const bookShelf = { books: null, description: "", id: null, name: "" }
      bookShelf.books = BookUtil.createBookArray(item)
      bookShelf.description = item.description
      bookShelf.id = Number(item.id) as any
      bookShelf.name = item.name
      return bookShelf
    })
    const bookShelf = bookData.map((item: any) => {
      return BookUtil.setBookShelf(item)
    })
    bookShelfs.value = bookShelf
  }

  const useCreateBookShelf = async (input: any) => {
    const variables = { input }
    const data = await context.root.$apollo.mutate({
      mutation: CREATE_BOOKSHELF,
      variables,
    })
    console.log("useCreateBookShelf", data)
  }

  const useGetUserBookShelf = async (input: any) => {
    const variables = { input }
    const data = await context.root.$apollo.query({
      query: GET_USER_BOOKSHELFS,
      variables,
    })
    console.log("useCreateBookShelf", data)
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
    useSetBookShelf,
    useHandleChangePositionMode,
    useAddBookShelfRow,
    useSaveBooksPosition,
    useSetBookPosition,
    useCreateBookShelf,
    useGetUserBookShelf,
  }
}
