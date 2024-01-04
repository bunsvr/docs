import { defineConfig } from 'vitepress';
import { SearchPlugin } from 'vitepress-plugin-search';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Stric',
  titleTemplate: 'Stric - :title',
  head: [
    ['link', {
      rel: 'icon', href: '/logo.svg'
    }]
  ],
  vite: { plugins: [SearchPlugin()] },
  description: "Build high-performance, scalable web apps",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/docs/intro' },
      { text: 'Examples', link: '//github.com/bunsvr/examples' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    logo: '/logo.svg',
    sidebar: [
      {
        text: 'Intro',
        link: '/docs/intro'
      },
      {
        text: 'Performance',
        link: '/docs/performance'
      },
      {
        text: 'App',
        link: '/docs/app/index',
        items: [
          {
            text: 'Routes',
            link: '/docs/app/routes'
          },
          {
            text: 'Responses',
            link: '/docs/app/responses'
          }
        ]
      }
    ]
  },
  ignoreDeadLinks: 'localhostLinks'
})
