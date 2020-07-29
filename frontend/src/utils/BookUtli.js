export default {
  setBookShelf: (bookData) => {
    let arrayLength = 4
    if (bookData.books.length) {
      const columnNo = bookData.books.map((item) => {
        return item.column_no
      })
      arrayLength = Math.max(...columnNo)
    }
    arrayLength = arrayLength <= 4 ? 4 : arrayLength
    const targetBookShelf = [...Array(arrayLength + 1)].map(() => {
      let items = []
      for (let i = 0; i < 4; i++) {
        let item = {}
        item.no = i
        items.push(item)
      }
      return items
    })
    let information
    information = { id: bookData.id, description: bookData.description, name: bookData.name }
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

  createBookArray: (item) => {
    if (item.books.length <= 0) return []
    return item.books.map((book) => {
      let bookData = {}
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