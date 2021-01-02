import Repository from "@/api"

const resource = process.env.VUE_APP_API_URL

export default {
  addBook(payload: any) {
    return Repository.post(`${resource}/api/books/`, payload)
  },
  deleteBook(payload: any) {
    return Repository.delete(`${resource}/api/books/${payload.id}`)
  },
  getBooks() {
    return Repository.get(`${resource}/api/books/`)
  },
  getBookShelf() {
    return Repository.get(`${resource}/api/book_shelf/`)
  },
  addBookShelf(payload: any) {
    return Repository.post(`${resource}/api/book_shelf/`, payload)
  },
  deleteBookShelf(payload: any) {
    return Repository.delete(`${resource}/api/book_shelf/${payload.id}`)
  },
  saveBooksPosition(payload: any) {
    return Repository.patch(`${resource}/api/books/edit_book_position/`, payload)
  },
}
