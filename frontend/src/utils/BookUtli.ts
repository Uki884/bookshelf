interface Book extends Payload {
  author: string
  title: string
  book_id: string
  column_no: number
  row_no: number
  cover: string
  created_at: string
  image: string
  isbn: string
  position_id: string
  price: string
  publisher: string
}

interface Payload {
  author: string
  title: string
  id: string
  column_no: number
  row_no: number
  cover: string
  created_at: string
  image: string
  isbn: string
  position_id: string
  price: string
  publisher: string
  bookPosition: { id: string; column_no: number; row_no: number }
}

export interface BookShelf {
  description: string
  id: number
  name: string
  books: Book[]
}

export default {
  setBookShelf: (bookData: BookShelf) => {
    let arrayLength = 4
    if (bookData.books.length) {
      const columnNo = bookData.books.map((item: Book) => {
        return item.column_no
      })
      arrayLength = Math.max(...columnNo)
    }
    arrayLength = arrayLength <= 4 ? 4 : arrayLength
    const targetBookShelf = [...Array(arrayLength + 1)].map(() => {
      const items = []
      for (let i = 0; i < 4; i++) {
        const item = {} as any
        item.no = i
        items.push(item)
      }
      return items
    })
    const information = { id: bookData.id, description: bookData.description, name: bookData.name }
    if (bookData.books.length > 0) {
      targetBookShelf.forEach((target, targetIndex) => {
        bookData.books.forEach((item, booksIndex) => {
          if (item.column_no == targetIndex) {
            const targetIndex = target.findIndex((index) => index.no == item.row_no)
            target.splice(targetIndex, 1, item)
          }
        })
      })
    }
    return { books: targetBookShelf, information }
  },

  createBookArray: (item: BookShelf) => {
    if (item.books.length <= 0) return []
    return item.books.map((book: Book) => {
      const bookData = {} as Book
      bookData.book_id = book.id
      bookData.author = book.author
      bookData.title = book.title
      bookData.cover = book.cover
      bookData.image = book.image
      bookData.isbn = book.isbn
      bookData.price = book.price
      bookData.publisher = book.publisher
      bookData.created_at = book.created_at
      bookData.position_id = book.bookPosition.id
      bookData.column_no = book.bookPosition.column_no
      bookData.row_no = book.bookPosition.row_no
      return bookData
    })
  }
}