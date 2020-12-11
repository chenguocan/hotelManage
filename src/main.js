import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "@/lib/element"
import request from "@/request/request"
import md5 from "js-md5"
import "@/lib/vant"
Vue.prototype.$md5=md5
Vue.prototype.$request=request

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
