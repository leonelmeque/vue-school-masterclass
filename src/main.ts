import './assets/styles.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import globalComponentRegister from './globalComponentRegister'
import store from '@/store'
import './config/firebase-config.js'
import FontAwesome from '@/plugins/FontAwesome'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(FontAwesome)

await globalComponentRegister(app)

app.mount('#app')
