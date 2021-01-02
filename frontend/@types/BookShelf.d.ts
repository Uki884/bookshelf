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

interface BookShelf {
  description: string
  id: number
  name: string
  books: Book[]
}