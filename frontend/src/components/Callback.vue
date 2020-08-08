<template>
  <div>コールバック</div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext} from "@vue/composition-api"
import { useUserStore } from '@/store/userStore'

export default defineComponent({
  setup(props: any, context: SetupContext) {
    const { useCreateUser, user } = useUserStore()
    const callback = async() => {
      const { appState, user } = await context.root.$auth0.handleRedirectCallback()
      await useCreateUser(user)
      const path = appState ? '/#' + appState : '/'
      location.href = path
    }
    callback()
    return {

    }
  }
})
</script>

<style>

</style>