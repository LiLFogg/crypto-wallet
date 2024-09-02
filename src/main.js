import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import { useFinanceStore } from './stores/financeStore';
import { useTransactionStore } from './stores/transactionStore';
import { useUserStore } from './stores/userStore';
const pinia = createPinia()

createApp(App).use(pinia).use(useUserStore).use(useFinanceStore).use(useTransactionStore).use(router).mount('#app')
