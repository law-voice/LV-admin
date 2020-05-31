// 此处的相对路径以 src/pages 为基准
export default [
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [{ path: '/login', component: './Login' }],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        name: '首页',
        icon: 'home',
        component: './Welcome',
      },
      {
        path: '/news',
        name: '新闻管理',
        icon: 'profile',
        component: '../layouts/BlankLayout/index',
        routes: [
          {
            path: '/news',
            name: '新闻管理',
            component: './News/List',
          },
          {
            path: '/news/detail/:id',
            name: '新闻详情',
            component: './News/Detail',
            hideInMenu: true,
          },
          {
            path: '/news/comments',
            name: '评论管理',
            component: './News/Comment/List',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/lesson',
        name: '微课管理',
        icon: 'play-square',
        component: '../layouts/BlankLayout/index',
        routes: [
          {
            path: '/lesson/video/list',
            name: '视频列表',
            component: './Lesson/Video/List',
          },
          {
            path: '/lesson/video/detail/:id',
            name: '视频详情',
            component: './Lesson/Video/Detail',
            hideInMenu: true,
          },
          {
            path: '/lesson/teacher/list',
            name: '名师列表',
            component: './Lesson/Teacher/List',
          },
          {
            path: '/lesson/teacher/detail/:id',
            name: '名师详情',
            component: './Lesson/Teacher/Detail',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/user',
        name: '用户管理',
        icon: 'user',
        component: '../layouts/BlankLayout/index',
        routes: [
          {
            path: '/user/customer/list',
            name: '用户列表',
            component: './User/Customer/List',
          },
          {
            path: '/user/customer/detail/:id',
            name: '用户详情',
            component: './User/Customer/Detail',
            hideInMenu: true,
          },
          {
            path: '/user/administrator/list',
            name: '管理员列表',
            component: './User/Administrator/List',
          },
          {
            path: '/user/administrator/detail/:id',
            name: '管理员详情',
            component: './User/Administrator/Detail',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/setting',
        name: '设置',
        icon: 'setting',
        component: '../layouts/BlankLayout/index',
        routes: [
          {
            path: '/setting/system',
            name: '系统设置',
            component: './Setting/System',
          },
          {
            path: '/setting/dictionary',
            name: '字典设置',
            component: './Setting/Dictionary',
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
