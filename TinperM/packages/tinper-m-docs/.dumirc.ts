import { defineConfig, resolvePath } from 'dumi';
import path from 'path'
const basicPath = '../../packages/tinper-m-basic/src'
export default defineConfig({
  title: 'TinperM',
  logo: './logo.png',
  favicons: ['./favicon.png'],
  base: '',
  publicPath: '',
  history: {type: 'hash'},
  copy: [
    { from: 'module.xml', to: './dist' }
  ],
  resolve: {
    codeBlockMode: 'passive',
  },
  alias: {
    '@tinper/m': path.resolve(__dirname, basicPath),
    '@components': path.resolve(__dirname, `${basicPath}/components`),
    '@assets':  path.resolve(__dirname, `${basicPath}/assets`),
    '@utils':  path.resolve(__dirname, `${basicPath}/utils`),
    '@common':  path.resolve(__dirname, `${basicPath}/common`),
    '@tests':  path.resolve(__dirname, `${basicPath}/tests`),
    '@hooks':  path.resolve(__dirname, `${basicPath}/hooks`),
    // 'ynf-tinper-m-pro$': path.resolve(__dirname, `node_modules/ynf-tinper-m-pro`),
    '@tinper/m-icons': path.resolve(__dirname, `../../node_modules/@tinper/m-icons`),
    'react-virtualized': path.resolve(__dirname, `node_modules/react-virtualized`),
    'react-beautiful-dnd': path.resolve(__dirname, `node_modules/react-beautiful-dnd`),
    '@theme': path.resolve(__dirname, `${basicPath}/theme`)
  },
  themeConfig: {
    // name: 'tinper-m-docs',
    socialLinks: {
      gitlab: 'https://git.yyrd.com/yonyou-ide/tinper-m'
    },
    nav: {
      mode: 'override',
      value: [
        {
          title: '关于',
          link: '/',
        },
        {
          title: '设计指导',
          link: '/design-guidance/',
          activePath: '/design-guidance/'
        },
        {
          title: '基础组件',
          link: '/basic-components/button',
          activePath: '/basic-components/'
        },
        {
          title: '高级组件',
          link: '/pro-components/table',
          activePath: '/pro-components/'
        },
        {
          title: '体验',
          link: '/preview/',
        },
        {
          title: '设计资源',

          link: '/design-resources/',
        },
        // {
        //   title: '体验度量看板',
        //   // disabled: true,
        //   link: '/experience/'
        // }
      ]
    },
    footer: '',
    lastUpdated: true,
    hd: {
      // umi-hd 的 750 高清方案（默认值）
      // rules: [{ mode: 'vw', options: [100, 750] }],
      // 禁用高清方案
      // 根据不同的设备屏幕宽度断点切换高清方案
      /* rules: [
        { maxWidth: 375, mode: 'vw', options: [100, 750] },
        { minWidth: 376, maxWidth: 750, mode: 'vw', options: [100, 1500] },
      ], */
      // 更多 rule 配置访问 https://github.com/umijs/dumi/blob/1.x/packages/theme-mobile/src/typings/config.d.ts#L7
    }
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'ynf-tinper-m-pro': 'TinperMPro',
  },
  headScripts:[
    '//design.yonyoucloud.com/static/react/18.2.0/umd/react.development.js',
    '//design.yonyoucloud.com/static/react-dom/18.2.0/umd/react-dom.development.js',
    './static/tinper-m-pro.min.js'
  ],
  links: [
    { href: './static/tinper-m-pro.css', rel: 'stylesheet', type: 'text/css'},
  ],
  proxy: {
    '/iuap-hc-manager': {
      'target': '',
      'changeOrigin': true,
      'pathRewrite': { '^/iuap-hc-manager' : '' },
    },
    '/help/yondesign': {
      'target': '',
      'changeOrigin': true,
      'pathRewrite': { '^/help/yondesign' : '' },
    },
    '/iuap-yonbuilder-mobile': {
      'target': '',
      'changeOrigin': true,
      'pathRewrite': { '^/iuap-yonbuilder-mobile' : '' },
    }
  },
});
