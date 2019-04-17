export default [
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/login',
        component: './login/Login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/welcome',
      },
      // dashboard
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      // factory
      {
        path: '/factory',
        name: 'factory',
        icon: 'smile',
        routes: [
          {
            path: '/factory/query',
            name: 'query',
            component: './factory/FactoryList',
          },
          {
            path: '/factory/create',
            name: 'create',
            component: './Welcome',
          },
        ],
      },
      {
        path: '/user',
        name: '用户管理',
        icon: 'smile',
        routes: [
          {
            path: '/user/query',
            name: '查看用户信息',
            component: './user/userList',
          },
        ],
      },
    ],
  },
];
