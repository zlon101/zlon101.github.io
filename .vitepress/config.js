import { defineConfig } from 'vitepress';
import getAllMdFile from './parse-dir.mjs';
import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolvePath = relaPath => path.resolve(__dirname, relaPath);
// process.env.NODE_ENV import.meta.env.DEV
const IsDev = process.argv[2] === 'dev';
const log = console.log;

log(`==== ${IsDev ? '开发' : '生产'}环境 ====`);

const nav = [
  // { text: '关于', link: '/vue3' },
];

const sidebar = getAllMdFile(resolvePath('../articles')).items.filter(item => item.text !== 'index');

export default defineConfig({
  title: '博客',
  description: '博客 blog',
  // base: IsDev ? '' : '/base/',
  lang: 'zh',
  srcDir: 'articles',
  outDir: 'docs',
  // srcExclude: ['tutorial/**/description.md'],
  head: [
    // 改变title的图标
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  ],
  // 主题配置
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    // 头部导航
    nav,
    // nav 右侧联系人模块
    socialLinks: [
      
      { 
        icon: {
          svg: '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M852.114 306.469L518.583 139.337a16.457 16.457 0 0 0-13.166 0L171.886 306.47a14.263 14.263 0 0 0 0 25.6l333.531 166.765a16.457 16.457 0 0 0 13.166 0L852.114 332.07a14.263 14.263 0 0 0 0-25.6z" fill="#1296DB"/><path d="M146.286 502.126a36.571 36.571 0 0 0 20.114 32.548l329.143 164.572a36.571 36.571 0 0 0 32.914 0L857.6 534.674a36.571 36.571 0 0 0 20.114-32.548 36.571 36.571 0 0 0-53.028-32.915L528.457 615.497a36.571 36.571 0 0 1-32.914 0L199.314 469.211a36.571 36.571 0 0 0-53.028 32.915z" fill="#1296DB"/><path d="M146.286 684.983A36.571 36.571 0 0 0 166.4 717.53l329.143 164.572a36.571 36.571 0 0 0 32.914 0L857.6 717.53a36.571 36.571 0 0 0 20.114-32.548 36.571 36.571 0 0 0-53.028-32.914L528.457 800.183a36.571 36.571 0 0 1-32.914 0L199.314 652.069a36.571 36.571 0 0 0-53.028 32.914z" fill="#1296DB"/></svg>'
        },
        link: 'https://zlon101.github.io/npm-lib/#/'
      },
      { icon: 'github', link: 'https://github.com/zlon101/' },
    ],
    // 侧边导航
    sidebar,
    // 右侧文章目录
    outline: [1, 3],
    outlineTitle: '本页目录',
    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2023-${new Date().getFullYear()} Evan You`
    }
  },
  rewrites: {
    'articles/index.md': 'articles/React/React基础.md',
  },
  ignoreDeadLinks: true,
});