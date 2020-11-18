import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/client2Page/',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
