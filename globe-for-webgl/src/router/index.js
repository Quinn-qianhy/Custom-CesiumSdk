import { createRouter, createWebHistory } from 'vue-router'
import Examples from '@/pages/Examples/Examples.vue'
import Development from '@/pages/Development/Development.vue'
import ExamplesView from '@/pages/ExamplesView/ExamplesView.vue'
import APIView from '@/pages/APIView/APIView.vue'

const routes = [
  { 
    path: '/', 
    redirect: '/Examples' 
  },
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/Examples' 
  }, // 默认跳转路由
  {
    path: '/Examples',
    name: 'Examples',
    component: Examples
  },
  {
    path: '/Development',
    name: 'Development',
    component: Development
  },
  {
    path: '/ExamplesView/:url',
    name: 'ExamplesView',
    component: ExamplesView
  },
  {
    path: '/APIView',
    name: 'APIView',
    component: APIView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
