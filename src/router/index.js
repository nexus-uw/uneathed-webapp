import Vue from 'vue'
import Router from 'vue-router'
import Work from '@/components/Work'
import Inventory from '@/components/inventory'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/work'
    },
    {
      path: '/work',
      name: 'Work',
      component: Work
    },
    {
      path: '/inventory',
      name: 'Inventory',
      component: Inventory
    }
  ]
})
