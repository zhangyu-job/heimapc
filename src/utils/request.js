/**
 * 封装请求工具request.js
 * 对于axios的二次封装
 * 配置拦截器以及其他
 */

import axios from 'axios'
import router from '@/router' // 引入router实例
import JSONBig from 'json-bigint' // 引入处理大数字的包
// 拦截器及其它操作
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 对axios的返回数据进行自定义处理，用json-bigint替代原来的json
axios.defaults.transformResponse = [function (data) {
  // 处理id超过大数字的时候   转化不正确的问题
  // 需要判断一下data是不是为空，为空就不能转化案例
  return data ? JSONBig.parse(data) : {}
}]
// 请求拦截器的开发
axios.interceptors.request.use(function (config) {
  // 成功执行   会有一个config  config就是所有的axios的请求信息
  // 需要将配置返回   返回的配置会作为请求参数进行请求
  // 在返回之前   就是统一注入token的最佳时间
  const token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 失败时，会有一个错误，直接reject错误即可
  // 失败时执行第二个   reject会直接进入axios的catch
  return Promise.reject(error)
})

// // 响应拦截器的开发
axios.interceptors.response.use(function (response) {
  // 成功
  // 回调函数第一个参数是响应体
  // 在拦截器其  需要将数据返回   将数据进行解构  即data.data=>data
  return response.data ? response.data : {}
}, function (error) {
  // 失败时执行
  // error是错误对象  里面包含了错的状态码和响应信息
  if (error.response.status === 401) {
    localStorage.removeItem('user-token')// 删除钥匙
    router.push('/login') // 直接导入路由实例对象，和组件的this.$router一样
  }
  return Promise.reject(error)
})
export default axios
