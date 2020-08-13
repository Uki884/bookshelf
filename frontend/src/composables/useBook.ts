import { reactive, SetupContext, ref } from "@vue/composition-api"
import {ADD_BOOK} from '@/apollo/mutations/addBook'
import { DELETE_BOOK } from '@/apollo/mutations/deleteBook.ts'

export default function useBook(context: SetupContext) {
  const state = reactive({
    searchPagenation: { count: null, first: null, last: null, page: null, pageCount: null },
    searchResult: {},
    selectBookId: null,
    searchWord: '',
    page: 1,
    currentPage: 1,
    barcodeResult: {},
    isCapturing: false
  })
  const useAddBook = async (input: any) => {
    const variables = { input }
    const data = await context.root.$apollo.mutate({
      mutation: ADD_BOOK,
      variables,
    })
  }
  const useDeleteBook = async (bookId: number) => {
    const variables = { bookId }
    const data = await context.root.$apollo.mutate({
      mutation: DELETE_BOOK,
      variables,
    })
  }
  return {
    state,
    useAddBook,
    useDeleteBook,
  }
}