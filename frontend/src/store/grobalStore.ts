import { inject, provide, InjectionKey } from "@vue/composition-api"
import {
  SetupContext,
  ref,
} from "@vue/composition-api"

export default function useGrobal(context: SetupContext) {

  const modals: any = ref([])

  const openModal = (payload: any) => {
    modals.value.push(payload)
  }

  // const closeModal = () => {
  //   modals.value.pop()
  // }

  const closeModal = () => {
    (context as any).root.ModalService.close()
  }
  const closeAllModal = () => {
    (context as any).root.ModalService.closeAll()
  }

  return {
    modals,
    openModal,
    closeModal,
    closeAllModal,
  }
}

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
