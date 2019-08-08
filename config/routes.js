// 此处的相对路径以 src/page/.umi 为基准
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
        path: '/Lesson',
        name: '课堂管理',
        icon: 'play-square',
        routes: [
          {
            path: '/Lesson/Video/List',
            name: '视频列表',
            component: './Lesson/Video/List',
          },
          {
            path: '/Lesson/Video/Detail',
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
