import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ConfirmAccess from "@/components/ConfirmAccess";

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: '/authPage/',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/confirm_access',
      name: 'ConfirmAccess',
      component: ConfirmAccess
    }
  ]
})
