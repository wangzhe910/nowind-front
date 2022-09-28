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
        path: '/mchConfig',
        component: '@/pages/appConfig/index',
      },
      {
        path: '/app',
        component: '@/pages/app/index',
      },
      {
        path: '/user',
        component: '@/pages/user/index',
      },
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
