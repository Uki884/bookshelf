import { inject, provide, InjectionKey } from "@vue/composition-api"
import useGrobal from "@/composables/useGrobal.ts"

// injectのためのキー
export const GrobalKey: InjectionKey<any> = Symbol("Grobal")

export function provideGrobal(context: any) {
  provide(GrobalKey, useGrobal(context))
}

export function useGrobalStore() {
  const store = inject(GrobalKey)
  if (!store) {
    throw Error("no store provided")
  }
  return store
}
