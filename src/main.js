import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios'
// axios.defaults.baseURL="http://127.0.0.1:8001"
axios.defaults.withCredentials = true // 是否跨域
axios.defaults.baseURL="/api"

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(config => {
  return config
})
Vue.prototype.$http = axios

import "swiper/swiper-bundle.css"
import "swiper/swiper.min.css";



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
