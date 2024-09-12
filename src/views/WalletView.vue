<template>
  <div>
    <div class="wallet-view">
      <CryptoBalance />
    </div>
    <button @click="showTransactionForm" type="button">New Sale or Purchase</button>
    <div class="transactionform" v-show="transactionForm">
      <TransactionForm :key="transactionForm" :transactionForm="transactionForm" @reset-form="handleResetForm"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CryptoBalance from '@/components/CryptoBalance.vue';
import TransactionForm from '@/components/TransactionForm.vue';
import { useFinanceStore } from '@/stores/financeStore';
import { useUserStore } from '@/stores/userStore';

const transactionForm = ref(false);
const financeStore = useFinanceStore();
const userStore = useUserStore();

const showTransactionForm = () => {
  transactionForm.value = true;
};

const handleResetForm = () => {
  transactionForm.value = false;
};

onMounted(async () => {
  await financeStore.fetchCryptoPrices();
  if (userStore.userId) {
    await financeStore.fetchTransactions(userStore.userId);
  } else {
    console.error('No user ID found. Cannot fetch transactions.');
  }
});

</script>

<style scoped>
.wallet-view {
  display: flex;
  flex-direction: column;
}


.transactionform{
  margin-top: 1rem;
}

.button{
  margin-top: 10px;
  margin-bottom: 1rem;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
