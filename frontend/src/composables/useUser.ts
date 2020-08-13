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
}

export default function useUser(context: SetupContext): UseUser {
  const user: any = ref(null)
  const isUserLoggedIn = computed(() => {
    return !!user.value?.id
  })

  const useCreateUser = async (user: any) => {
    const variables = { input: { email: user.email, name: user.nickname, auth0Id: user.sub }}
    await (context as any).root.$auth0.getUser()
    const { data } = await context.root.$apollo.mutate({
      mutation: CREATE_USER,
      variables
    })
    user.value = data.createUser
    return user
  }

  const useGetCurrentUser = async () => {
    const isLoggedIn = await (context as any).root.$auth0.isLoggedIn()
    if (!isLoggedIn) return
    if (!user.value) {
      const { userData, idToken } = await(context as any).root.$auth0.getUser()
      const variables = { auth0Id: userData.sub }
      const data = await context.root.$apollo.query({
        query: GET_CURRENT_USER,
        variables,
      })
      user.value = data.data.currentUser
      return data.data.currentUser
    }
  }

  const login = async () => {
    (context as any).root.$auth0.loginWithRedirect()
  }

  const logout = async () => {
    (context as any).root.$auth0.logout()
  }

  return {
    user,
    isUserLoggedIn,
    login,
    logout,
    useCreateUser,
    useGetCurrentUser,
  }
}

