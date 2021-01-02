import { inject, provide,  InjectionKey } from "@vue/composition-api"

import {
  reactive,
  SetupContext,
  ref
} from "@vue/composition-api"

import BookUtil, { BookShelf } from "@/utils/BookUtli"
import { CREATE_BOOKSHELF } from '@/apollo/mutations/createBookShelf.ts'
import { GET_USER_BOOKSHELFS } from '@/apollo/queries/getUserBookShelfs'
import { SAVE_BOOK_POSITION } from '@/apollo/mutations/saveBookPosition.ts'
import { DELETE_BOOKSHELF } from '@/apollo/mutations/deleteBookshelf.ts'
import { CHANGE_BOOKSHELF_NAME } from "@/apollo/mutations/changeBookshelfName.ts"
import { GET_ALL_BOOKSHELFS } from "@/apollo/queries/getAllBookshelfs.ts"

const BOOKSHELF_SELECT_MENU = [
  { id: 1, name: "本を追加/削除" },
  { id: 2, name: "本の位置を変更" },
  { id: 3, name: "本棚の名前を変更" },
  { id: 4, name: "本棚を削除", color: "red" },
]

const swiperOption = {
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
  }
}

export default function useBookShelf(context: SetupContext) {
  const state: any = reactive({
    bookShelfs: [],
    editBookPositions: [],
    isEditMode: false,
    isOpenMenu: false,
    isEditPositionMode: false,
  })

  const bookShelfs = ref([])

  const setBookShelf = async (bookshelf: any) => {
    const bookData = bookshelf.map((item: any) => {
      const bookShelf = { } as BookShelf
      bookShelf.books = BookUtil.createBookArray(item)
      bookShelf.description = item.description
      bookShelf.id = Number(item.id) as any
      bookShelf.name = item.name
      return bookShelf
    })
    const result = bookData.map((item: any) => {
      return BookUtil.setBookShelf(item)
    })
    return result
  }

  const createBookShelf = async (input: any) => {
    const variables = { input }
    const data = await context.root.$apollo.mutate({
      mutation: CREATE_BOOKSHELF,
      variables,
    })
    console.log("useCreateBookShelf", data)
  }

  const getUserBookShelf = async (userId: any) => {
    const variables = { userId }
    const { data } = await context.root.$apollo.query({
      query: GET_USER_BOOKSHELFS,
      variables
    })
    const bookShelf = await setBookShelf(data.userBookshelfs)
    bookShelfs.value = bookShelf
  }

  const getAllBookshelfs = async () => {
    const data = await context.root.$apollo.query({
      query: GET_ALL_BOOKSHELFS
    })
    return data.data.allBookshelfs
  }

  const changeBookshelfName = async (input: any) => {
    const variables = { input }
    const { data } = await context.root.$apollo.mutate({
      mutation: CHANGE_BOOKSHELF_NAME,
      variables
    })
  }

  const handleChangePositionMode = (state: any, flag: boolean) => {
    state.isEditPositionMode = flag
  }

  const addBookShelfRow = (bookShelf: any) => {
    const emptyBooks = [{}, {}, {}, {}]
    bookShelf.books.push(emptyBooks)
    return state
  }

  const saveBooksPosition = async (input: any) => {
    const variables = { input }
    const data = await context.root.$apollo.mutate({
      mutation: SAVE_BOOK_POSITION,
      variables,
    })
    state.isEditPositionMode = false
  }

  //移動した本の位置を保存
  const setBookPosition = (
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
  const deleteBookShelf = async (bookshelfId: number) => {
    const variables = { bookshelfId }
    const { data } = await context.root.$apollo.mutate({
      mutation: DELETE_BOOKSHELF,
      variables,
    })
  }

  // 本棚編集モード
  const handleEdit = (flg: boolean) => {
    state.isEditPositionMode = false
    state.isEditMode = flg
  }

  return {
    state,
    bookShelfs,
    swiperOption,
    BOOKSHELF_SELECT_MENU,
    useSetBookShelf: setBookShelf,
    useHandleChangePositionMode: handleChangePositionMode,
    useAddBookShelfRow: addBookShelfRow,
    useSaveBooksPosition: saveBooksPosition,
    useSetBookPosition: setBookPosition,
    useCreateBookShelf: createBookShelf,
    useGetUserBookShelf: getUserBookShelf,
    useDeleteBookShelf: deleteBookShelf,
    useChangeBookshelfName: changeBookshelfName,
    useGetAllBookshelfs: getAllBookshelfs,
    useHandleEdit: handleEdit
  }
}

// injectのためのキー
export const BookShelfKey: InjectionKey<any> = Symbol(
  "BookShelfModule"
)

export function provideBookShelf(context: any) {
  provide(BookShelfKey, useBookShelf(context))
}

export function useBookShelfStore() {
  const store = inject(BookShelfKey)
  if (!store) {
    throw Error("no store provided")
  }
  return store
}
