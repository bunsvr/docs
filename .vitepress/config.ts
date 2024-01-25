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
      { icon: 'github', link: '//github.com/bunsvr' }
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
        link: '/docs/app/',

        items: [
          {
            text: 'Routes',
            link: '/docs/app/routes'
          },
          {
            text: 'Responses',
            link: '/docs/app/responses'
          },
          {
            text: 'Lifecycles',
            link: '/docs/app/lifecycles'
          },
          {
            text: 'Configurations',
            link: '/docs/app/configs'
          },
          {
            text: 'Validation',
            link: '/docs/app/validation'
          }
        ]
      },
      {
        text: 'Utils',
        link: '/docs/utils/',

        items: [
          {
            text: 'CORS',
            link: '/docs/utils/cors'
          }
        ]
      }
    ]
  },
  ignoreDeadLinks: 'localhostLinks'
})
