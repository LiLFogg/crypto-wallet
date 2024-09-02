import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { financeStore } from './stores/financeStore'
import { transactionStore } from './stores/transactionStore'
import { userStore } from './stores/userStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

export { financeStore, transactionStore, userStore }