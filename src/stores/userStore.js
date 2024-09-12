import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useFinanceStore } from './financeStore';


export const useUserStore = defineStore('user', () => {
  const userId = ref('');
  const financeStore = useFinanceStore();

function login(username){
  console.log('logging in whit username:', username);
  userId.value = username;
  console.log('User ID:', userId.value);
  financeStore.fetchTransactions(userId.value);
  
}

  return { userId, financeStore, login };
});
