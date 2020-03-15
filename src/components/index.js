// 需要使用Vue.use的方式去注册
// Vue.use会调用对象的install方法
import LayoutHeader from './home/layout-header'
import LayoutAside from './home/layout-aside'
import BreadCrumb from './common/bread-crumb'
import VueQuillEditor from 'vue-quill-editor'
import CoverImage from './publish/cover-image'
import SelectImage from './publish/select-image'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install: function (Vue) {
    Vue.component('layout-header', LayoutHeader)
    Vue.component('layout-aside', LayoutAside)
    Vue.component('bread-crumb', BreadCrumb)
    // 注册富文本编辑器
    Vue.use(VueQuillEditor /* { default global options } */)
    // 注册封面组件
    Vue.component('cover-image', CoverImage)
    // 注册选择图片组件
    Vue.component('select-image', SelectImage)
  }
}
