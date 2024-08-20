import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useFinanceStore } from './financeStore';


export const useUserStore = defineStore('user', () => {
  const userId = ref('');
  const financeStore = useFinanceStore();


  function setUserId(id) {
    userId.value = id;
    financeStore.fetchTransactions(id);
  }

  return { userId, setUserId, financeStore };
});
