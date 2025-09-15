import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'DynamicRouter',
    //   component: () => import('../components/DynamicRouter.vue'),
    // },
    {
      path: '/:pathMatch(.*)*',
      name: 'NestedExample',
      component: () => import('../components/NestedExample.vue'),
    },
  ],
});

export default router;
