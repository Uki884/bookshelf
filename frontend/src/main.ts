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
import {
  onMounted,
} from "@vue/composition-api";

(async function () {
  await authService.init()
  Vue.prototype.$auth0 = authService
  Vue.config.productionTip = false
  new Vue({
    router,
    store,
    apolloProvider,
    setup(props, context) {
      onMounted(async () => {
        const isLoggedIn = await (context as any).root.$auth0.isLoggedIn()
        if (isLoggedIn && context.root.$route.path !== '/my_bookshelf') {
          context.root.$router.push('/my_bookshelf')
        } else if(!isLoggedIn && context.root.$route.path !== '/') {
          context.root.$router.push("/")
        }
      })
    },
    render: (h) => h(App),
  }).$mount("#app")
}())
