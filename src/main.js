import { createApp } from 'vue'
import { CreatePinia } from 'pinia';
import App from './App.vue'
import router from './router'
import store from './store/userStore'

const pinia = CreatePinia()

createApp(App).use(pinia).use(store).use(router).mount('#app')
