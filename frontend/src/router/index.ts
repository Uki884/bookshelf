import Vue from 'vue'
import VueRouter from 'vue-router'
import MyBookShelf from "@/views/MyBookShelf.vue"
import isLoggedIn from '@/router/plugins/isLoggedIn.js'
import CallBack from '@/views/Callback.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "top",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/callback",
    name: "callback",
    component: CallBack,
  },
  {
    path: "/my_bookshelf",
    name: "MyBookShelf",
    component: MyBookShelf,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      requiresAuth: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
