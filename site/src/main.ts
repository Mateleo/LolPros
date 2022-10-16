import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from "@vueuse/head"
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(head)
app.use(autoAnimatePlugin)
app.use(router)


app.mount('#app')
