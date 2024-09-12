import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useFinanceStore } from './stores/financeStore'
import { useTransactionStore } from './stores/transactionStore'
import { useUserStore } from './stores/userStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

export { useFinanceStore as financeStore, useTransactionStore as transactionStore, useUserStore as userStore }