import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import VueCookies from 'vue-cookies'

createApp(App).use(router).use(VueCookies).mount('#app')


import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BACKEND_URL;
