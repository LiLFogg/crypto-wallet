import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTransactionStore = defineStore('transactionStore', () => {

  const transactions = ref([]);


  function addTransaction(transaction) {
    transactions.value.push(transaction);
  }
  function removeTransaction(transactionId) {
    transactions.value = transactions.value.filter(t => t.id !== transactionId);
  }
  function updateTransaction(updatedTransaction) {
    const index = transactions.value.findIndex(t => t.id === updatedTransaction.id);
    if (index !== -1) {
      transactions.value[index] = updatedTransaction;
    }
  }

  return {
    transactions,
    addTransaction,
    removeTransaction,
    updateTransaction
  };
});
