import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/HomeScene.vue'),
          meta: { showSidebar: true, title: '示例中心' }
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('@/views/About.vue'),
          meta: { showSidebar: false, title: '关于项目' }
        }
      ]
    },
    {
      path: '/examples/html/:examplePath(.*)',
      component: () => import('@/layouts/MapLayout.vue'),
      meta: { exampleType: 'html' },
      children: [
        {
          path: '',
          name: 'HtmlExample',
          component: () => import('@/views/HtmlExamplePage.vue')
        }
      ]
    },
    {
      path: '/examples/:componentId',
      component: () => import('@/layouts/MapLayout.vue'),
      meta: { exampleType: 'vue' },
      children: [
        {
          path: '',
          name: 'Example',
          component: () => import('@/views/SceneManage.vue')
        }
      ]
    }
  ]
})

export default router
