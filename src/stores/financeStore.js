import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useFinanceStore = defineStore('finance', () => {
  const transactions = ref([]);
  const cryptoPrices = ref({});

  //fetch transactions
  async function fetchTransactions(userId) {
    try {
      const response = await axios.get(`https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id": "${userId}"}`, {
        headers: { 'x-apikey': 'YOUR_API_KEY' } // replace with your actual API key
      });
      transactions.value = response.data;
      calculateCryptoBalances();
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }

  // Fetch crypto prices 
  async function fetchCryptoPrices() {
    try {
      const response = await axios.get('https://criptoya.com/api/satoshitango/btc/ars/');
      cryptoPrices.value = response.data;
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
    }
  }

  // Calculate total value
  function calculateCryptoBalances() {
    const balances = {};
    transactions.value.forEach(transaction => {
      const { crypto_code, crypto_amount, money, action } = transaction;
      if (action === 'purchase') {
        if (!balances[crypto_code]) {
          balances[crypto_code] = { amount: 0, totalMoney: 0 };
        }
        balances[crypto_code].amount += parseFloat(crypto_amount);
        balances[crypto_code].totalMoney += parseFloat(money);
      } else if (action === 'sale') {
        if (balances[crypto_code]) {
          balances[crypto_code].amount -= parseFloat(crypto_amount);
          balances[crypto_code].totalMoney -= parseFloat(money);
        }
      }
    });
    return balances;
  }

  // get the total value of all cryptocurrencies
  const cryptoBalances = computed(() => calculateCryptoBalances());

  // get the total money
  const totalMoney = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
      return transaction.action === 'purchase' ? acc + parseFloat(transaction.money) : acc - parseFloat(transaction.money);
    }, 0);
  });

  return { transactions, cryptoPrices, fetchTransactions, fetchCryptoPrices, cryptoBalances, totalMoney };
});