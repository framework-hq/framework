import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'FrameWork',
  description: 'Production-ready templates for internal tools',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Templates', link: '/templates/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'GitHub', link: 'https://github.com/framework-hq/framework' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Why FrameWork?', link: '/guide/why-framework' },
          ]
        },
        {
          text: 'CLI',
          items: [
            { text: 'Installation', link: '/guide/cli-installation' },
            { text: 'Commands', link: '/guide/cli-commands' },
          ]
        },
      ],
      '/templates/': [
        {
          text: 'Templates',
          items: [
            { text: 'Overview', link: '/templates/' },
            { text: 'Landing Page', link: '/templates/landing-page' },
            { text: 'CRM', link: '/templates/crm' },
            { text: 'Booking', link: '/templates/booking' },
            { text: 'Dashboard', link: '/templates/dashboard' },
            { text: 'Invoicing', link: '/templates/invoicing' },
          ]
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/framework-hq/framework' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 FrameWork',
    },
  },
})
