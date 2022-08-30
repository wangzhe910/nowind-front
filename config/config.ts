import { defineConfig } from 'umi';
import pageRoutes from './routes';

export default defineConfig({
  // 配置antd布局
  // layout: {
  //   name: 'hello',
  //   locale: true,
  //   layout: 'side',
  // },
  // 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存。
  hash: true,
  // 配置国际化语言
  locale: {
    default: 'zh-CN',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: pageRoutes,
  fastRefresh: {},
  proxy: {
    '/merchant': {
      target: 'http://120.77.252.213:8010',
      // target:
      //   process.env.NODE_ENV === 'development'
      //     ? 'http://120.77.252.213:8010'
      //     : 'http://saas-loc.upeso.ph', // 正式环境请求地址
      changeOrigin: true,
    },
  },
});
