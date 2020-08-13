import { inject, provide,  InjectionKey } from "@vue/composition-api"
import useBookShelf from '@/composables/useBookshelf'

// injectのためのキー
export const BookShelfKey: InjectionKey<any> = Symbol(
  "BookShelfModule"
)

export function provideBookShelf(context: any) {
  provide(BookShelfKey, useBookShelf(context))
}

export function useBookShelfStore() {
  const store = inject(BookShelfKey)
  if (!store) {
    throw Error("no store provided")
  }
  return store
}
