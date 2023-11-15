import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Stric',
  titleTemplate: 'Stric - :title',
  head: [
    ['link', {
      rel: 'icon', href: '/logo.svg'
    }]
  ],
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
        text: 'Basics',
        link: '/docs/basics/main',
        items: [
          {
            text: 'App',
            link: '/docs/basics/app'
          }
        ]
      }
    ]
  },
  ignoreDeadLinks: 'localhostLinks'
})
