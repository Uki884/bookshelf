import {
  SetupContext,
  ref,
} from "@vue/composition-api"

export default function useGrobal(context: SetupContext) {

  const modals: any = ref([])

  const openModal = (payload: any) =>{
    modals.value.push(payload)
  }

  // const closeModal = () => {
  //   modals.value.pop()
  // }

  const closeModal = () => {
    (context as any).root.ModalService.close()
  }

  return {
    modals,
    openModal,
    closeModal,
  }
}