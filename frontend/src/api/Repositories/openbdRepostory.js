
import Repository from '@/api/index'

const resource = 'https://api.openbd.jp/v1/get'

export default {
  getBook(isbn) {
    return Repository.get(`${resource}`, { params: { isbn: isbn } })
  }
}
