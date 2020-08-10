import { inject, provide, InjectionKey } from "@vue/composition-api"
import useBook from "@/composables/useBook"

// injectのためのキー
export const BookKey: InjectionKey<any> = Symbol("BookModule")

export function provideBook(context: any) {
  provide(BookKey, useBook(context))
}

export function useBookStore() {
  const store = inject(BookKey)
  if (!store) {
    throw Error("no store provided")
  }
  return store
}
