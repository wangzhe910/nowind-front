export default [
  {
    path: '/login',
    component: '@/pages/login',
  },
  {
    path: '/',
    component: '@/layout/BaseLayout',
    routes: [
      {
        path: '/mch',
        component: '@/pages/merchantManagement/index',
      },
      {
        path: '/',
        component: '@/pages/index',
      },
    ],
  },
];
