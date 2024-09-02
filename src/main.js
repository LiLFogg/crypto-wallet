import { createApp } from 'vue'
import { CreatePinia } from 'pinia';
import App from './App.vue'
import router from './router'
import userStore from './stores/userStore'
import financeStore from './stores/financeStore';
import transactionStore from './stores/transactionStore';
import { useUserStore } from './stores/userStore';
const pinia = CreatePinia()

createApp(App).use(pinia).use(userStore).use(useUserStore).use(financeStore).use(transactionStore).use(router).mount('#app')
