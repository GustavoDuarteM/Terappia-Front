import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Painel from '../pages/Painel'
import Patients from '../pages/Patients'
import Sessions from '../pages/Sessions'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Home,
    alias: ['/', '/home'],
    beforeEnter(to, from, next) {
      if (store.getters.user_authenticated) {
        next('/painel')
      } else {
        next()
      }
    }
  },
  {
    path: '/painel',
    component: Painel,
    beforeEnter(to, from, next) {
      if (store.getters.user_authenticated) {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/sessions',
    component: Sessions,
    beforeEnter(to, from, next) {
      if (store.getters.user_authenticated) {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/patients',
    component: Patients,
    beforeEnter(to, from, next) {
      if (store.getters.user_authenticated) {
        next()
      } else {
        next(false)
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
