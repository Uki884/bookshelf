import openbdRepostory from '@/api/Repositories/openbdRepostory.js'
import rakutenApiRepository from '@/api/Repositories/rakutenApiRepository.js'
import BookRepository from "@/api/Repositories/BookRepository.js"
import UserRepository from "@/api/Repositories/UserRepository.js"

const repositories = {
  openbd: openbdRepostory,
  rakuten: rakutenApiRepository,
  book: BookRepository,
  user: UserRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
