import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "@/lib/element"
import request from "@/request/request"
import md5 from "js-md5"
Vue.prototype.$md5=md5
Vue.prototype.$request=request
import VueUploadImgs from 'vue-upload-imgs'

Vue.use(VueUploadImgs)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
