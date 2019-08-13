// 此处的相对路径以 src/pages 为基准
export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        name: '欢迎',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/news',
        name: '新闻板块',
        icon: 'profile',
        component: '../layouts/BlankLayout/index',
        routes: [
          {
            path: '/news/list',
            name: '新闻管理',
            icon: 'bars',
            component: './News/List',
          },
          {
            path: '/news/detail/:id',
            name: '新闻详情',
            component: './News/Detail',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/Lesson',
        name: '课堂管理',
        icon: 'play-square',
        component: '../layouts/BlankLayout/index',
        routes: [
          {
            path: '/Lesson/Video/List',
            name: '视频列表',
            component: './Lesson/Video/List',
          },
          {
            path: '/Lesson/Video/Detail/:id',
            name: '视频详情',
            component: './Lesson/Video/Detail',
            hideInMenu: true,
          },
          {
            path: '/Lesson/Teacher/List',
            name: '名师列表',
            component: './Lesson/Teacher/List',
          },
          {
            path: '/Lesson/Teacher/Detail',
            name: '名师详情',
            component: './Lesson/Teacher/Detail',
            hideInMenu: true,
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
