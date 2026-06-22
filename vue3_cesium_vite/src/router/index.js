import {
  createRouter,
  createWebHashHistory
} from "vue-router";
const router = createRouter({
  history: createWebHashHistory(),
  // 默认进入全场景
  routes: [
    // 首页大屏
    {
      path: "/",
      component: () => import( /* webpackChunkName: "HomeScene" */ '../views/HomeScene.vue')
    },
    {
      path: "/examples/:id*",
      component: () => import( /* webpackChunkName: "HomeScene" */ '../views/SceneManage.vue'),
      props: true
    }
  ]
});
router.beforeEach((to, from, next) => {
  // 路由判断 是否需要挂载cesium
  if (!to.path.startsWith('/examples')) {
    const container = document.querySelector('#cesiumContainer');
    if (container && container.parentNode) {
      document.body.removeChild(container);
    }
  }
  next()
})

export default router;