
import Repository from '@/api/index'

const resource = 'https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&'

export default {
  getBook(isbn) {
    return Repository.get(`${resource}`, { params: { isbnjan: isbn, applicationId: '1067182697530334388' } })
  },
  getSearchBook(payload) {
    return Repository.get(`${resource}`, { params: { page: payload.page , keyword: payload.keyword, booksGenreId: '001' ,applicationId: '1067182697530334388' } })
  }
}
