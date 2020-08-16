import {
  SetupContext,
  computed,
  Ref,
  ref
} from "@vue/composition-api"

import { CREATE_USER } from '@/apollo/mutations/createUser.ts'
import { GET_USER } from "@/apollo/queries/getUser.ts"
import { GET_CURRENT_USER } from '@/apollo/queries/getCurrentUser.ts'

export interface UseUser {
  user: Ref<{ email: string, id: number, first_name: string, last_name: string, username: string } | null>
  isUserLoggedIn: Ref<boolean>
  login: () => any
  logout: () => any
  useCreateUser: (user: any) => Promise<void>
  useGetCurrentUser: () => any
  userGetCurrentUserByToken:() => any
}

export default function useUser(context: SetupContext): UseUser {
  const user: any = ref(null)
  const isLoading = ref(false)
  const isUserLoggedIn = computed(() => {
    return !!user.value?.id
  })

  const useCreateUser = async () => {
    isLoading.value = true
    const { userData } = await(context as any).root.$auth0.getUser()
    const variables = { input: { email: userData.email, name: userData.nickname, auth0Id: userData.sub }}
    const { data } = await context.root.$apollo.mutate({
      mutation: CREATE_USER,
      variables
    })
    user.value = data.createUser
    isLoading.value = false
    return user.value
  }

  const useGetCurrentUser = async () => {
    const isLoggedIn = await (context as any).root.$auth0.isLoggedIn()
    if (!isLoggedIn) return
    if (!user) {
      const { userData, idToken } = await (context as any).root.$auth0.getUser()
      const variables = { auth0Id: userData.sub }
      const data = await context.root.$apollo.query({
        query: GET_CURRENT_USER,
        variables,
      })
      user.value = data.data.currentUser
      return data.data.currentUser
    } else {
      return user.value
    }
  }

  const userGetCurrentUserByToken = async () => {
    isLoading.value = true
    const accessToken = localStorage.getItem("idToken")
    if (!accessToken) return
    const data = await context.root.$apollo.query({
      query: GET_CURRENT_USER,
    })
    user.value = data.data.currentUser
    isLoading.value = false
    return data.data.currentUser
  }

  const login = async () => {
    (context as any).root.$auth0.loginWithRedirect()
  }

  const logout = async () => {
    (context as any).root.$auth0.logout()
  }

  return {
    user,
    isLoading,
    isUserLoggedIn,
    login,
    logout,
    useCreateUser,
    useGetCurrentUser,
    userGetCurrentUserByToken,
  }
}

