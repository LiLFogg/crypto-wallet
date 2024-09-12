// stores/financeStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useFinanceStore = defineStore('finance', () => {
  const transactions = ref([]);
  const cryptoPrices = ref({
    bitcoin: 0,
    usdc: 0,
    ethereum: 0,
  });

  // Fetch transactions
  async function fetchTransactions(userId) {
    try {
      const response = await axios.get(`https://laboratorio-ab82.restdb.io/rest/transactions?q={"user_id": "${userId}"}`, {
        headers: { 'x-apikey': '650b525568885487530c00bb' }
      });
      transactions.value = response.data;
      calculateCryptoBalances();
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }

  async function fetchCryptoPrices() {
    try {
      const btcResponse = await axios.get('https://criptoya.com/api/satoshitango/btc/ars');
      const ethResponse = await axios.get('https://criptoya.com/api/satoshitango/eth/ars');
      const usdcResponse = await axios.get('https://criptoya.com/api/satoshitango/usdc/ars'); 

      cryptoPrices.value = {
        bitcoin: btcResponse.data.last, 
        ethereum: ethResponse.data.last,
        usdc: usdcResponse.data.last
      };
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
    }
  }

  function calculateCryptoBalances() {
    const balances = {
      bitcoin: { amount: 0, totalMoney: 0 },
      ethereum: { amount: 0, totalMoney: 0 },
      usdc: { amount: 0, totalMoney: 0 }
    };

    transactions.value.forEach(transaction => {
      const { crypto_code, crypto_amount, money, action } = transaction;
      //inicializo el balance si no existe
      if (!balances[crypto_code]) {
        balances[crypto_code] = { amount: 0, totalMoney: 0 };
      }
      if (action === 'purchase') {
        balances[crypto_code].amount += parseFloat(crypto_amount);
        balances[crypto_code].totalMoney += parseFloat(money);
      } else if (action === 'sale') {
        balances[crypto_code].amount -= parseFloat(crypto_amount);
        balances[crypto_code].totalMoney -= parseFloat(money);
      }
    });

    //actualizo los balances a su conversion en pesos ARS
    Object.keys(balances).forEach(code => {
      balances[code].totalMoney = balances[code].amount * cryptoPrices.value[code] || 0; // Default to 0 if price is not available
    });

    return Object.entries(balances).map(([crypto_code, balance]) => ({
      crypto_code,
      amount: balance.amount,
      totalMoney: balance.totalMoney
    }));
  }

  const cryptoBalances = computed(() => calculateCryptoBalances());

  const totalMoney = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
      return transaction.action === 'purchase' ? acc + parseFloat(transaction.money) : acc - parseFloat(transaction.money);
    }, 0);
  });

  return { transactions, cryptoPrices, fetchTransactions, fetchCryptoPrices, cryptoBalances, totalMoney };
});
