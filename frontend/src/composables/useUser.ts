import {
  reactive,
  SetupContext,
  InjectionKey,
  onUnmounted,
  computed,
  toRefs,
  Ref,
  ref
} from "@vue/composition-api"

import { RepositoryFactory } from "@/api/Factory/index.js"
import { validation, requestInput } from "@/utils/validation.js"

export interface UseUser {
  user: Ref<{ email: string, id: number, first_name: string, last_name: string, username: string } | null>
  isUserLoggedIn: Ref<boolean>
  useSignUp: () => void
  useGetUser: (user: any, userRepository: any) => Promise<boolean>
  useLogin: (input: { email: string, password: string }) => Promise<void>
}

const getUser = async (user: any, userRepository: any) => {
  const data = await userRepository.getUser()
  const { email, pk, first_name, last_name, username } = data.data
  user.value = { email, id: pk, first_name, last_name, username }
}

export default function useUser(context: SetupContext): UseUser {
  const userRepository = RepositoryFactory.get("user")
  const user: any = ref(null)
  const isUserLoggedIn = computed(() => {
    return !!user.value?.id
  })

  const useGetUser: any = async() => {
    try {
      await getUser(user, userRepository)
      return true
    } catch (error) {
      return false
    }
  }

  const useLogin = async (input: { email: string, password: string }) => {
    const result = validation(input)
    if (result.validStatus) {
      const payload = requestInput(input)
      await context.root.$store.dispatch('user/loginUser', payload)
      await getUser(user, userRepository)
      await context.root.$router.push({ path: "/my_bookshelf" })
    }
  }

  const useSignUp = () => {
    context.root.$router.push({ path: "/signup" })
  }

  useGetUser()

  return {
    user,
    isUserLoggedIn,
    useSignUp,
    useGetUser,
    useLogin,
  }
}

