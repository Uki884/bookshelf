import openbdRepostory from '@/api/Repositories/openbdRepostory.ts'
import rakutenApiRepository from '@/api/Repositories/rakutenApiRepository.ts'
import * as BookRepository from "@/api/Repositories/BookRepository.ts"
import UserRepository from "@/api/Repositories/UserRepository.ts"

interface Repository {
    openbd: typeof openbdRepostory
    rakuten: typeof rakutenApiRepository,
    book: typeof BookRepository,
    user: typeof UserRepository,
}

type RepositoryType = 'openbd' | 'rakuten'| 'book' | 'user'

interface RepositoryFactory {
  get: (name: RepositoryType) => any
}

const repositories: Repository = {
  openbd: openbdRepostory,
  rakuten: rakutenApiRepository,
  book: BookRepository,
  user: UserRepository
}

export const RepositoryFactory: RepositoryFactory = {
  get: (name: RepositoryType) => repositories[name]
}
