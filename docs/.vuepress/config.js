import { defineUserConfig } from 'vuepress';

import { viteBundler } from '@vuepress/bundler-vite';
import { defaultTheme } from '@vuepress/theme-default';

import navbar from './config/navbar';
import sidebar from './config/sidebar';

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    logo: '/images/logo.png',
    navbar: navbar,
    sidebar: sidebar,
    docsRepo: 'https://github.com/jackyanjiaqi/jackyanjiaqi.github.io',
    docsBranch: 'main',
    docsDir: 'docs',
    editLinkText: '编辑此页',
    contributorsText: '贡献者',
    lastUpdatedText: '最后更新',
  }),
})