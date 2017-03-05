import Vue from 'vue'
import Router from 'vue-router'
import Work from '@/components/Work'
import Inventory from '@/components/Inventory'
import CreateIssue from '@/components/CreateIssue'
import Status from '@/components/Status'
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
    },
    {
      path: '/create_issue',
      name: 'Create Issue',
      component: CreateIssue
    },
    {
      path: '/status',
      name: 'Status',
      component: Status
    }
  ]
})
