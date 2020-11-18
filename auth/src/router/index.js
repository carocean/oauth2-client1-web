import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/ssoPage/',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})