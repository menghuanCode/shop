import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Order from '../views/Order.vue'
import My from '../views/My.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { app: true }
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    meta: { app: true }
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: () => import(/* webpackChunkName: "orderDetail" */ '../views/orderDetail.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: My,
    meta: { app: true }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/shops',
    name: 'shops',
    // route level code-splitting
    // this generates a separate chunk (shops.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "shops" */ '../views/shops.vue')
  },
  {
    path: '/addressList',
    name: 'addressList',
    // route level code-splitting
    // this generates a separate chunk (addressList.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "addressList" */ '../views/addressList.vue')
  },
  {
    path: '/addressForm',
    name: 'addressForm',
    // route level code-splitting
    // this generates a separate chunk (addressForm.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "addressForm" */ '../views/addressForm.vue')
  },
  {
    path: '/user',
    name: 'user',
    // route level code-splitting
    // this generates a separate chunk (user.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user" */ '../views/user.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
