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
import User from "@/mixins/User.js"
import ModalService from "@/services/modal/index.js"
import VueCompositionApi from "@vue/composition-api"

Vue.mixin(isDevice)
Vue.mixin(User)
Vue.prototype.ismobile = mobile
Vue.prototype.ModalService = ModalService

Vue.component('v-icon', Icon)

Vue.use(VueCompositionApi)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
