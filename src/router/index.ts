import { createRouter, createWebHistory } from 'vue-router';

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
      name: 'receipts',
      component: () => import('../pages/ReceiptView.vue'),
    },
    {
      path: '/journal',
      name: 'journal',
      component: () => import('../pages/JournalView.vue'),
    },
    {
      path: '/ledger',
      name: 'ledger',
      component: () => import('../pages/LedgerView.vue'),
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../pages/ReportsView.vue'),
    },
  ],
});

export default router;
