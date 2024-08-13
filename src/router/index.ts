import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { top: 0 }
  //   }
  // },
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView,
    },
    {
      path: '/receipts',
      name: 'receipts',
      component: () => import('../views/ReceiptView.vue'),
    },
    {
      path: '/ledger',
      name: 'ledger',
      component: () => import('../views/LedgerView.vue'),
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../views/ReportsView.vue'),
    },
  ],
});

export default router;
