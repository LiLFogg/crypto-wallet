import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useFinanceStore = defineStore('finance', () => {
  const transactions = ref([]);
  const cryptoPrices = ref({});

  //fetch transactions
  async function fetchTransactions(userId) {
    try {
      const response = await axios.get(`https://laboratorio-ab82.restdb.io/rest/transactions?q={"user_id": "${userId}"}`, {
        headers: { 'x-apikey': '650b525568885487530c00bb' } // replace with your actual API key
      });
      transactions.value = response.data;
      calculateCryptoBalances();
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }

  async function fetchCryptoPrices() {
    try {
      const response = await axios.get('https://criptoya.com/api/satoshitango/btc/ars/');
      cryptoPrices.value = response.data;
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
    }
  }

  function calculateCryptoBalances() {
    const balances = {
      bitcoin: { amount: 100, totalMoney: 10000 },
      ethereum: { amount: 50, totalMoney: 5000 },
      // Add more cryptocurrencies as needed
    };

    transactions.value.forEach(transaction => {
      const { crypto_code, crypto_amount, money, action } = transaction;
      if (action === 'purchase') {
        balances[crypto_code].amount += parseFloat(crypto_amount);
        balances[crypto_code].totalMoney += parseFloat(money);
      } else if (action === 'sale') {
        balances[crypto_code].amount -= parseFloat(crypto_amount);
        balances[crypto_code].totalMoney -= parseFloat(money);
      }
    });

    return Object.values(balances);
  }

  const cryptoBalances = computed(() => calculateCryptoBalances());

  const totalMoney = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
      return transaction.action === 'purchase' ? acc + parseFloat(transaction.money) : acc - parseFloat(transaction.money);
    }, 0);
  });

  return { transactions, cryptoPrices, fetchTransactions, fetchCryptoPrices, cryptoBalances, totalMoney };
});