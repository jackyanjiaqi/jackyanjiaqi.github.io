import { defineUserConfig } from 'vuepress';

import { viteBundler } from '@vuepress/bundler-vite';
import { defaultTheme } from '@vuepress/theme-default';

import sidebar from './config/sidebar';

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    logo: '/images/logo.png',
    sidebar: sidebar,
    docsRepo: 'https://github.com/ilgnefz/flame-cn',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkText: '编辑此页',
    contributorsText: '贡献者',
    lastUpdatedText: '最后更新',
  }),
})