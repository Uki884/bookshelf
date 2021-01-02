
import Repository from "@/api"

const resource = 'https://api.openbd.jp/v1/get'

export default {
  getBook(isbn: string) {
    return Repository.get(`${resource}`, { params: { isbn: isbn } })
  }
}
