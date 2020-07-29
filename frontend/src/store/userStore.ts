import { provide, inject, InjectionKey } from "@vue/composition-api"
import useUser from '@/composables/useUser'

// injectのためのキー
export const UserKey: InjectionKey<any> = Symbol("User")

export function provideUser(context: any) {
  provide(UserKey, useUser(context))
}

export function useUserStore() {
  const store = inject(UserKey)
  if (!store) {
    throw Error('no store provided')
  }
  return store
}
