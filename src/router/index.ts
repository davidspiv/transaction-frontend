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
      component: () => import('../pages/ReceiptsPage.vue'),
    },
    {
      path: '/journal',
      name: 'journal',
      component: () => import('../pages/JournalPage.vue'),
    },
    {
      path: '/ledger',
      name: 'ledger',
      component: () => import('../pages/LedgerPage.vue'),
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../pages/ReportsPage.vue'),
    },
  ],
});

export default router;

//nested route https://router.vuejs.org/guide/essentials/nested-routes.html
