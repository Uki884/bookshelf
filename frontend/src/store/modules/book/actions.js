import { RepositoryFactory } from "@/api/Factory/index.js"
const openbd = RepositoryFactory.get("openbd")
const rakuten = RepositoryFactory.get("rakuten")
const book = RepositoryFactory.get("book")
const user = RepositoryFactory.get("user")
import BookUtli from "@/utils/BookUtli.js"

export const actions = {
  async getBookShelf({ commit }) {
    try {
      const data = await book.getBookShelf()
      const bookData = data.data.map(item => {
        const bookShelf = {}
        bookShelf.books = BookUtli.createBookArray(item)
        bookShelf.description = item.description
        bookShelf.id = item.id
        bookShelf.name = item.name
        return bookShelf
      }
      )
      const bookShelf = bookData.map((item) => {
        return BookUtli.setBookShelf(item)
      })
      commit("setBookShelf", bookShelf)
    } catch (error) {
      console.log(error)
    }
  },
  async addBookShelf({ commit, dispatch }, payload) {
    try {
      const { data } = await book.addBookShelf(payload)
      await dispatch("getUserBook")
    } catch (error) {
      console.log(error)
    }
  },
  async getBooks({ commit }) {
    try {
      const { data } = await book.getBooks()
      commit("setBooks", data)
    } catch (error) {
      console.log(error)
    }
  },
  async getBook({ commit }, payload) {
    commit('clearBook')
    try {
      let openbdResult
      let rakutenResult
      let rakutenData
      let openbdData
      await Promise.all([openbd.getBook(payload), rakuten.getBook(payload)]).then(Response => {
        console.log(Response)
        openbdResult = Response[0]
        rakutenResult = Response[1]
      })
      await commit("setDetected", true)
      if (!openbdResult.data[0] && rakutenResult.data.Items.length <= 0) {
        commit('setSearchResult', false)
        return false
      }
      if (openbdResult.data[0]) {
        openbdData = {
          isbn: openbdResult.data[0].summary.isbn,
          title: openbdResult.data[0].summary.title,
          publisher: openbdResult.data[0].summary.publisher,
          cover: openbdResult.data[0].summary.cover,
          author: openbdResult.data[0].summary.author,
        }
      }
      if (rakutenResult.data.Items[0]) {
        rakutenData = {
          isbn: rakutenResult.data.Items[0].Item.isbn,
          price: rakutenResult.data.Items[0].Item.itemPrice,
          title: rakutenResult.data.Items[0].Item.title,
          cover: rakutenResult.data.Items[0].Item.largeImageUrl,
          publisher: rakutenResult.data.Items[0].Item.publisherName,
          author: rakutenResult.data.Items[0].Item.author
        }
      }
      const book = { ...rakutenData, ...openbdData }
      commit("setBook", book)
      commit("setSearchResult", true)
      return true
    } catch (error) {
      return error.response
    }
  },
  async getSearchBook({ commit }, payload) {
    try {
      const rakutenResult = await rakuten.getSearchBook(payload)
      const searchBooks = rakutenResult.data.Items.map(data => data.Item)
      const { count, first, last, page, pageCount } = rakutenResult.data
      commit("setSearchBooks", searchBooks)
      commit("setPagination", { count, first, last, page, pageCount })
    } catch (error) {
      commit("clearSearchBooks")
      commit("clearPagenation")
    }
  },
  async addBook({ state, commit, dispatch}, payload) {
    try {
      await book.addBook({ ...state.book, ...payload }).then(async Response => {
        await dispatch("getUserBook")
      })
    } catch (error) {
      console.log(error)
    }
  },
  async deleteBook({ state, commit, dispatch }, payload) {
    const request = {
      id: payload.item.book_id
    }
    try {
      await book.deleteBook(request).then(async Response => {
        await dispatch("getUserBook")
      })
    } catch (error) {
      console.log(error)
    }
  },
  async deleteBookShelf({ state, commit, dispatch }, payload) {
    const request = {
      id: payload.id
    }
    try {
      await book.deleteBookShelf(request).then(async Response => {
        await dispatch("getUserBook")
      })
    } catch (error) {
      console.log(error)
    }
  },
  async saveBooksPosition({ state, commit, dispatch }, payload) {
    try {
      await book.saveBooksPosition(payload).then(async (Response) => {
        await dispatch("getUserBook")
      })
    } catch (error) {
      console.log(error)
    }
  },
  async getUserBook({ commit, rootState }, payload) {
    const user_id = rootState.user.user.user_id
    try {
      const data = await user.getUserBook(user_id)
      const bookData = data.data.map(item => {
        const bookShelf = {}
        bookShelf.books = BookUtli.createBookArray(item)
        bookShelf.description = item.description
        bookShelf.id = item.id
        bookShelf.name = item.name
        return bookShelf
      }
      )
      const bookShelf = bookData.map((item) => {
        return BookUtli.setBookShelf(item)
      })
      commit("user/setUserBookShelf", bookShelf, {root: true})
    } catch(error) {
      console.log(error)
    }
  },
}