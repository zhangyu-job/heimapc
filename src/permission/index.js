// 专门处理路由权限
import router from '@/router'
// 引入进度条
import progress from 'nprogress'
import 'nprogress/nprogress.css'
// 注册全局前置守卫
// 回调函数在路由发生之前执行
// next有三种场景，放过 next()、拦截 next(false)、跳转 next(新地址，地址可以多个)
router.beforeEach(function (to, from, next) {
  // 开启进度条
  progress.start()
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

// 在全局后置守卫的位置关闭   此时已经完成了路由的跳转
router.afterEach(() => {
  // 关闭进度条
  // setTimeout(() => progress.done(), 1000)
  progress.done()
})
