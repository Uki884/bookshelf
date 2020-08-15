<template>
  <div>コールバック</div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, watch, onMounted} from "@vue/composition-api"
import { useUserStore } from '@/store/userStore'

export default defineComponent({
  setup(props: any, context: SetupContext) {
    const { useCreateUser, user } = useUserStore()

    onMounted(async ()=>{
      await (context as any).root.$auth0.handleRedirectCallback()
      await useCreateUser()
      context.root.$router.push('/my_bookshelf')
    })

    return {

    }
  }
})
</script>

<style>

</style>