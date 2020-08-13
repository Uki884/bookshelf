<template>
  <div>コールバック</div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, watch} from "@vue/composition-api"
import { useUserStore } from '@/store/userStore'

export default defineComponent({
  setup(props: any, context: SetupContext) {
    const { useCreateUser, user } = useUserStore()
    const callback = async() => {
      const { appState } = await (context as any).root.$auth0.handleRedirectCallback()
      await useCreateUser()
      await context.root.$router.replace('/my_bookshelf')
    }

    callback()
    return {

    }
  }
})
</script>

<style>

</style>