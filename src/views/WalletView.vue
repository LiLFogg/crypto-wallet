<template>
  <div class="wallet-view">
    <CryptoBalance />
    <button @click="showTransactionForm">New Sale or Purchase</button>
  </div>
  <div v-if="transactionForm">
    <TransactionForm :transactionForm="transactionForm" @reset-form="handleResetForm"/>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref } from 'vue';
import CryptoBalance from '@/components/CryptoBalance.vue';
import TransactionForm from '@/components/TransactionForm.vue';

var transactionForm = ref('false');

function showTransactionForm() {
  transactionForm = ref('true');
}

function handleResetForm() {
  transactionForm.value = false;
}
</script>

<style scoped>
.wallet-view {
  display: flex;
  flex-direction: column;
}

.button{
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
