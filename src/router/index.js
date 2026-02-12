import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layouts/Layout.vue'
import Login from '@/pages/Login.vue'
import Dashboard from '@/pages/Dashboard.vue'
import TableManagement from '@/pages/TableManagement.vue'
import FoodManagement from '@/pages/FoodManagement.vue'
import CueManagement from '@/pages/CueManagement.vue'
import RevenueManagement from '@/pages/RevenueManagement.vue'

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Dashboard },
      { path: 'tables', component: TableManagement },
      { path: 'foods', component: FoodManagement },
      { path: 'cues', component: CueManagement },
      { path: 'revenue', component: RevenueManagement }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (!token && to.path !== '/login') {
    next('/login')
  } else if (token && to.path === '/login') {
    next('/')
  } else {
    next()
  }
})

export default router