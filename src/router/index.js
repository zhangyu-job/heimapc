import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import secondHome from '@/views/home/second_home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        // 二级路由的path什么都不写，代表二级路由的默认组件
        path: '',
        component: secondHome
      },
      {
        // path:'/home/comment'  //完整地址
        path: 'comment', // 简写地址
        component: () => import('@/views/comment') // 按需加载
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
