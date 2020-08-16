<template>
  <div class="callback">
    <Loading />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, watch, onMounted} from "@vue/composition-api"
import { useUserStore } from '@/store/userStore'
import { useBookShelfStore } from '@/store/bookShelfStore.ts'
import Loading from '@/components/Loading.vue'

export default defineComponent({
  components: {
    Loading
  },
  setup(props: any, context: SetupContext) {
    const { useCreateUser, user } = useUserStore()
    const { useGetUserBookShelf, useSetBookShelf, bookShelfs } = useBookShelfStore()

    onMounted(async ()=>{
      await (context as any).root.$auth0.handleRedirectCallback()
      const userData = await useCreateUser()
      if (userData.bookShelf) {
        bookShelfs.value = await useSetBookShelf(userData.bookShelf)
      }
      await context.root.$router.push('/my_bookshelf')
    })

    return {

    }
  }
})
</script>

<style scoped>
.callback {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>