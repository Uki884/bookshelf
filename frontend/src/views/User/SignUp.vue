<template>
  <div class="user">
    <div class="user__wrapper">
      <div class="user__contents">
        <div class="user__header">
          登録
        </div>
        <div class="form">
          <text-field
            v-model="input.username.value"
            :value="input.username.value"
            :name="input.username.name"
            :error-message="input.username.errorMessage"
            :required="input.username.require" />
          <text-field
            v-model="input.email.value"
            :value="input.email.value"
            :name="input.email.name"
            :error-message="input.email.errorMessage"
            :required="input.email.require" />
          <text-field
            v-model="input.password.value"
            input-type="password"
            :value="input.password.value"
            :name="input.password.name"
            :error-message="input.password.errorMessage"
            :required="input.password.require" />
          <text-field
            v-model="input.password_comfirm.value"
            input-type="password"
            :value="input.password_comfirm.value"
            :name="input.password_comfirm.name"
            :error-message="input.password_comfirm.errorMessage"
            :required="input.password_comfirm.require" />
          <div
            class="btn--active"
            @click="SignUp">
            登録
          </div>
          <div
            class="form__text"
            @click="login()">
            アカウントをお持ちの方はこちら
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validation, requestInput } from '@/utils/validation.js'
import TextField from "@/components/molecules/InputTextField.vue"
export default {
  components: {
    TextField
  },
  data() {
    return {
      validateStatus: true,
      input: {
        username: {
          name: 'ユーザー名',
          value: '',
          length: [1, 32],
          require: true,
          errorMessage: []
        },
        email: {
          name: 'メールアドレス',
          value: '',
          length: [1, 32],
          require: true,
          format: 'Mail',
          errorMessage: []
        },
        password: {
          name: 'パスワード',
          value: '',
          length: [1, 32],
          require: true,
          errorMessage: []
        },
        password_comfirm: {
          name: '確認用パスワード',
          value: '',
          length: [1, 32],
          require: true,
          errorMessage: []
        },
      },
    }
  },
  watch: {
    'input.password_comfirm.value': {
      handler(newValue) {
        if(newValue !== this.input.password.value){
          this.input.password_comfirm.errorMessage.push('パスワードが一致しません')
          this.validateStatus = false
        } else {
          this.input.password_comfirm.errorMessage = []
          this.validateStatus = true
        }
      }
    },
    'input.password.value': {
      handler(newValue) {
        if (newValue == this.input.password_comfirm.value) {
          this.input.password_comfirm.errorMessage = []
          this.validateStatus = true
        }
      }
    }
  },
  methods: {
    handleValidate(){
      let result
      return validation(this.input)
    },
    async SignUp() {
      const result = this.handleValidate()
      if (result.validStatus && this.validateStatus) {
        const payload = requestInput(this.input)
        await this.$store.dispatch('user/addUser', payload)
        await this.$router.push('/my_bookshelf')
      }
    },
    login() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/user.scss';
@import 'src/assets/scss/form.scss';
@import '@/assets/scss/btn.scss';
</style>