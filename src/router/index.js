import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layouts/Layout.vue'
import Dashboard from '@/pages/Dashboard.vue'
import TableManagement from '@/pages/TableManagement.vue'
import FoodManagement from '@/pages/FoodManagement.vue'
import CueManagement from '@/pages/CueManagement.vue'
import RevenueManagement from '@/pages/RevenueManagement.vue'

const routes = [
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

export default createRouter({
  history: createWebHistory(),
  routes
})
