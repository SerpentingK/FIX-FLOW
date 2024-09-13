import './assets/main.css'
import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/rutas'

const app = createApp(App)
app.use(router)
app.mount('#app')