import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Stric",
  description: "Fast, simple, scalable",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/docs/getting-started' },
      { text: 'Examples', link: '//github.com/bunsvr/examples' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    sidebar: [
      {
        text: 'Intro',
        link: '/docs/intro'
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
