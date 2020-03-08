import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import Components from '@/components'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.less'
Vue.config.productionTip = false
Vue.use(Components)
Vue.use(ElementUI)
// 配置axios的baseURL   公共的请求头地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 将原型属性赋值给vue对象的原型属性
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
