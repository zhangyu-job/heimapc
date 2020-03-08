// 专门处理路由权限
import router from '@/router'

// 注册全局前置守卫
// 回调函数在路由发生之前执行
// next有三种场景，放过 next()、拦截 next(false)、跳转 next(新地址，地址可以多个)
router.beforeEach(function (to, from, next) {
  // 首先判断是不是去主页
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
