import path from 'path';
import slash from 'slash2';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import webpackPlugin from './plugin.config';
import routes from './routes';

const { primaryColor } = defaultSettings;

const { NODE_ENV } = process.env;

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      dynamicImport: {
        loadingComponent: './components/common/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: false,
      // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      dll: {
        include: [
          'react',
          'react-dom',
          'react-router',
          'redux',
          'prop-types',
          'dva',
          'dva/router',
          'dva/saga',
          'dva/fetch',
          'umi',
          'umi-request',
          'antd',
          'antd',
          '@ant-design/pro-layout',
          '@antv/data-set',
          'react-container-query',
          'react-copy-to-clipboard',
          'react-document-title',
          'react-media',
          'react-media-hook2',
          'lodash',
          'moment',
          'qs',
          'classnames',
          'omit.js',
          'prop-types',
        ],
      },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: NODE_ENV === 'development' ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  alias: {
    '@': path.resolve(__dirname, '../src'),
  },
  define: {},
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
};
