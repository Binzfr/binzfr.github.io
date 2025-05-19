import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { aliases, md } from 'vuetify/iconsets/md'
import '@fortawesome/fontawesome-free/css/all.css'
import { fa } from 'vuetify/iconsets/fa'

import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'md',
    aliases,
    sets: { md, fa },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#180161',      // Fond du restant de la page
          hero: '#0E003B',            // Fond du hero section
          accent: '#FB773C',          // Orange accent
          badge: '#FDFF74', // Couleur du badge en dark
        },
      },
      light: {
        colors: {
          background: '#DDE6FF',      // Fond du restant de la page
          hero: '#F6F3FF',            // Fond du hero section
          accent: '#EB3678',          // Orange accent
          badge: '#4C4C22', // Couleur du badge en light
        },
      },
    },
  },
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
