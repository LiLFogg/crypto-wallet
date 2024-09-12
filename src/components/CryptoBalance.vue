<template>
  <div class="crypto-balance">
    <h2>Current Balance</h2>
    <div v-for="balance in cryptoBalances" :key="balance.crypto_code" class="crypto-item">
      <p>{{ balance.crypto_code }}: {{ balance.totalMoney.toFixed(2) }} ARS</p>
    </div>
    <div class="total-money">
      <h3>Total Money:</h3>
      <p>$ {{ totalMoney.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFinanceStore } from '@/stores/financeStore';


const financeStore = useFinanceStore();
const cryptoBalances = computed(() => financeStore.cryptoBalances);

const totalMoney = computed(() => {
  return cryptoBalances.value.reduce((acc, balance) => {
    return acc + Math.max(0, balance.totalMoney);
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