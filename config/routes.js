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
        component: '../layouts/BlankLayout',
        routes: [
          {
            path: '/news/list',
            name: '新闻',
            icon: 'bars',
            component: './News/List',
          },
          {
            path: '/news/detail/:id',
            name: '新闻详情',
            component: './News/Detail',
            hideInMenu: true,
          },
          {
            path: '/news/reply',
            icon: 'message',
            name: '评论',
            component: './News/Reply',
          },
          {
            path: '/news/vote',
            icon: 'fund',
            name: '投票',
            component: './News/Vote',
          },
        ],
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
          }
         ]
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
