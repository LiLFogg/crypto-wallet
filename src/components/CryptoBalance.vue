<template>
  <div class="crypto-balance">
    <h2>Current Balance</h2>
    <div v-for="(crypto, code) in cryptoBalances" :key="code" class="crypto-item">
      <h3>Cryptocurrency: {{ code.charAt(0).toUpperCase() + code.slice(1) }}</h3>
      <p>Quantity: {{ crypto.amount.toFixed(8) }}</p>
      <p>Value: $ {{ (crypto.totalMoney.toFixed(2)) }}</p>
    </div>
    <div class="total-money">
      <h3>Total Money:</h3>
      <p>$ {{ totalMoney }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFinanceStore } from '@/stores/financeStore';


const financeStore = useFinanceStore();

const totalMoney = computed(() => {
  return financeStore.cryptoBalances.reduce((total, balance) => {
    return total + balance.amount;
  }, 0);
});


</script>

<style scoped>
.crypto-balance {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 1rem;
}

.crypto-item {
  margin-bottom: 1rem;
}

h2 {
  margin-top: 0;
}

h3 {
  margin: 0;
  font-size: 1.2rem;
}

p {
  margin: 0.5rem 0;
}

.total-money {
  margin-top: 1rem;
  font-weight: bold;
}
</style>