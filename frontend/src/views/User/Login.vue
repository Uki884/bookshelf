<template>
  <div class="user">
    <div class="user__wrapper">
      <div class="user__contents">
        <div class="user__header">
          ログイン
        </div>
        <div class="form">
          <text-field
            v-model="state.input.email.value"
            :label="false"
            input-type="email"
            :value="state.input.email.value"
            :name="state.input.email.name"
            :error-message="state.input.email.errorMessage"
            :require="state.input.email.require" />
          <text-field
            v-model="state.input.password.value"
            :label="false"
            input-type="password"
            :value="state.input.password.value"
            :name="state.input.password.name"
            :error-message="state.input.password.errorMessage"
            :require="state.input.password.require" />
          <div
            class="btn--active"
            @click="useLogin(state.input)">
            ログイン
          </div>
          <div class="form__text">
            パスワードを忘れた方
          </div>
          <div
            class="form__text"
            @click="useSignUp">
            登録はこちら
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext} from "@vue/composition-api"
import { useUserStore } from '@/store/userStore'
import TextField from "@/components/molecules/InputTextField.vue"

export default defineComponent({
  components: {
    TextField
  },
  setup(props: any, context: SetupContext) {
    const { useSignUp, useLogin } = useUserStore()
    const state = reactive({
      input: {
        email: {
          name: 'メールアドレス',
          value: '',
          length: [1, 32],
          format: 'Mail',
          require: true,
          errorMessage: []
        },
        password: {
          name: 'パスワード',
          value: '',
          length: [1, 32],
          require: true,
          errorMessage: []
        },
      }
    })

    return {
      state,
      useSignUp,
      useLogin,
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/user.scss';
@import 'src/assets/scss/form.scss';
@import '@/assets/scss/btn.scss';
</style>