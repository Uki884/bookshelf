import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-awesome/icons'
import '@/firebase/firebaseConfig.js'
import Icon from "vue-awesome/components/Icon.vue"
import '@/services/grobalComponents/index.js'
import mobile from "ismobilejs"
import isDevice from "@/mixins/isDevice.js"
import ModalService from "@/services/modal/index.js"
import VueCompositionApi from "@vue/composition-api"
import { apolloClient } from '@/apollo'
import VueApollo from "vue-apollo"

Vue.mixin(isDevice)
Vue.prototype.ismobile = mobile
Vue.prototype.ModalService = ModalService
Vue.use(VueApollo)
Vue.component('v-icon', Icon)

Vue.use(VueCompositionApi)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

import authService from "./auth"

(async function () {
  await authService.init()
  Vue.prototype.$auth0 = authService
  Vue.config.productionTip = false
  new Vue({
    router,
    store,
    apolloProvider,
    render: (h) => h(App),
  }).$mount("#app")
}())
