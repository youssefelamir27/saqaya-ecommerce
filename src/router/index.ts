import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

// Vue 3 router — no Vue.use() needed, createRouter replaces new VueRouter()
const router = createRouter({
  // createWebHistory replaces mode: 'history'
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/ProductsView.vue'),
    },
    {
      path: '/product/:id',
      name: 'view-product',
      component: () => import('@/views/DetailView.vue'),
    },
    {
      // Vue 3 uses :pathMatch(.*) instead of * for catch-all routes
      path: '/:pathMatch(.*)*',
      name: 'ErrorPage',
      component: () => import('@/views/ErrorView.vue'),
    },
  ],

  // always scroll to top on navigation
  scrollBehavior() {
    return { top: 0 };  // Vue 3 uses top/left instead of x/y
  },
});

export default router;
