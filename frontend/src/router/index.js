import Vue from 'vue'
import VueRouter from 'vue-router'
import MyBookShelf from "../views/MyBookShelf.vue"
import Login from '@/views/User/Login.vue'
import SignUp from "@/views/User/SignUp.vue"
import isLoggedIn from '@/router/plugins/isLoggedIn.js'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "top",
    meta: {
      requiresAuth: true,
    }
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
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: isLoggedIn,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem("token")
  if (to.matched.some((item) => item.meta.requiresAuth)) {
    if (!token) {
      next("/login")
      return
    } else {
      if (to.path === '/') {
        next('my_bookshelf')
      }
      next()
    }
  }
  next()
})

export default router
