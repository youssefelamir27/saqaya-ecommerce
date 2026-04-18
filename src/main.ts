import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

// import global SCSS styles
import './styles/main.scss'
// import css file for fontawesome icons
import './assets/all.css'
const app = createApp(App)

// register persistence plugin so cart survives page refreshes
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
