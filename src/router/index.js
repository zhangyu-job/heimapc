import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import secondHome from '@/views/home/second_home'
Vue.use(VueRouter)

const routes = [
  {
    // 匹配任何找不到组建的路由
    path: '*',
    component: () => import('@/views/404')
  },
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
      }, {
        // path:'/home/comment'  //完整地址
        path: 'comment', // 简写地址
        component: () => import('@/views/comment') // 按需加载
      }, {
        // path:'/home/material'
        path: 'material',
        component: () => import('@/views/material')
      }, {
        path: 'articles',
        component: () => import('@/views/articles')
      }, {
        path: 'publish/:articleId?', // 发布文章
        component: () => import('@/views/publish')
      }, {
        path: 'account', // 账户组件
        component: () => import('@/views/account')
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
