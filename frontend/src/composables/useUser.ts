import {
  SetupContext,
  computed,
  Ref,
  ref
} from "@vue/composition-api"

import { CREATE_USER } from '@/apollo/mutations/createUser.ts'
import { GET_USER } from "@/apollo/queries/getUser.ts"

export interface UseUser {
  user: Ref<{ email: string, id: number, first_name: string, last_name: string, username: string } | null>
  isUserLoggedIn: Ref<boolean>
  login: () => any
  logout: () => any
  useCreateUser: (user: any) => Promise<void>
  useGetUser: () => any
}

export default function useUser(context: SetupContext): UseUser {
  const user: any = ref(null)
  const isUserLoggedIn = computed(() => {
    return !!user.value?.id
  })

  const useCreateUser = async (user: any) => {
    const variables = { input: { email: user.email, name: user.nickname, auth0Id: user.sub }}
    const { data } = await context.root.$apollo.mutate({
      mutation: CREATE_USER,
      variables
    })
    user.value = data.createUser
    return user
  }

  const useGetUser = async () => {
    const isLoggedIn = await context.root.$auth0.isLoggedIn()
    if (!isLoggedIn) return
    if (!user.value) {
      const data = await context.root.$auth0.getUser()
      const variables = { auth0Id: data.sub }
      const userData = await context.root.$apollo.query({
        query: GET_USER,
        variables,
      })
      console.log("getUser", userData)
      user.value = userData.data.user
      return userData.data.user
    }
  }

  const login = async () => {
    context.root.$auth0.loginWithRedirect()
  }

  const logout = async () => {
    context.root.$auth0.logout()
  }

  return {
    user,
    isUserLoggedIn,
    login,
    logout,
    useCreateUser,
    useGetUser,
  }
}

