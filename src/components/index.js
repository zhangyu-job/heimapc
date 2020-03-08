// 需要使用Vue.use的方式去注册
// Vue.use会调用对象的install方法
import LayoutHeader from './home/layout-header'
import LayoutAside from './home/layout-aside'
export default {
  install: function (Vue) {
    Vue.component('layout-header', LayoutHeader)
    Vue.component('layout-aside', LayoutAside)
  }
}
