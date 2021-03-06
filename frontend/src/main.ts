import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-awesome/icons'
import Icon from "vue-awesome/components/Icon.vue"
import isDevice from "@/mixins/isDevice.ts"
import ModalService from "@/services/modal"
import VueCompositionApi from "@vue/composition-api"
import { apolloClient } from '@/apollo'
import { RepositoryFactory } from '@/api/Factory'
import VueApollo from "vue-apollo"

Vue.mixin(isDevice)
Vue.prototype.$modalService = ModalService
Vue.prototype.$RepositoryFactory = RepositoryFactory
Vue.use(VueApollo)
Vue.component('v-icon', Icon)

Vue.use(VueCompositionApi)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

import authService from "@/services/auth"

const createVueApp = async() => {
  await authService.init()
  Vue.prototype.$auth0 = authService
  Vue.config.productionTip = false
  new Vue({
    router,
    store,
    apolloProvider,
    render: (h) => h(App),
  }).$mount("#app")
}

createVueApp()
