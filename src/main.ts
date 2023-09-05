import './assets/styles.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import globalComponentRegister from './globalComponentRegister'

const app = createApp(App)

app.use(createPinia())
app.use(router)

await globalComponentRegister(app)

app.mount('#app')
