<template>
  <div class="transaction-form">
    <h1>New Purchase or Sale</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="cryptoCode">Cryptocurrency:</label>
        <select id="cryptoCode" v-model="cryptoCode" required>
          <option value="" disabled>Select a cryptocurrency</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="usdc">USDC</option>
          <option value="ethereum">Ethereum</option>
          <!-- Add more cryptocurrencies as needed -->
        </select>
      </div>
      
      <div class="form-group">
        <label for="cryptoAmount">Amount:</label>
        <input
          type="number"
          id="cryptoAmount"
          v-model.number="cryptoAmount"
          min="0"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="datetime">Date and Time:</label>
        <input
          type="datetime-local"
          id="datetime"
          v-model="datetime"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="money">Amount in ARS:</label>
        <input
          type="number"
          id="money"
          v-model.number="money"
          step="0.01"
          min="0"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="action">Action:</label>
        <select id="action" v-model="action" required>
          <option value="purchase">Purchase</option>
          <option value="sale">Sale</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref, defineEmits, defineProps } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useTransactionStore } from '@/stores/transactionStore';
import axios from 'axios';

const userStore = useUserStore();
const transactionStore = useTransactionStore();

const cryptoCode = ref('');
const cryptoAmount = ref(0);
const datetime = ref('');
const money = ref(0);
const action = ref('purchase');

const props = defineProps({
  transactionForm: {
    type: Boolean,
    required: true,
  }
})

const emit = defineEmits(['reset-form'])

function handleSubmit() {
  const id = userStore.userId;
  const formattedDatetime = new Date(datetime.value).toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).replace(',', '');

  if (
    cryptoAmount.value <= 0 ||
    money.value <= 0 ||
    new Date(datetime.value) > new Date()
  ) {
    alert('Invalid input. Ensure amounts are positive and date is not in the future.');
    return;
  }

  const transaction = {
    user_id: id,
    action: action.value,
    crypto_code: cryptoCode.value.toLowerCase(),
    crypto_amount: cryptoAmount.value.toFixed(8),
    money: money.value.toFixed(2),
    datetime: formattedDatetime
  };

  axios.post('https://laboratorio-ab82.restdb.io/rest/transactions', transaction, {
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '650b525568885487530c00bb' 
    }
  })
  .then( () => {
    transactionStore.addTransaction(transaction);
    resetForm();
    showSuccessMessage();
    emit('reset-form');
  })
  .catch(error => {
    console.error('Error adding transaction:', error);
    alert('There was an error adding the transaction.');
  });
}

function resetForm() {
  cryptoCode.value = '';
  cryptoAmount.value = 0;
  datetime.value = '';
  money.value = 0;
  action.value = 'purchase';

}

function showSuccessMessage() {
  const message = document.createElement('div');
  message.classList.add('success-message');
  message.textContent = 'Transaction added successfully!';
  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 3000);
}
</script>

<style scoped>
.transaction-form {
  max-width: 500px;
  margin-top: 10px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.success-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  background-color: #dff0d8;
  color: #3c763d;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  z-index: 9999;
}

.form-group {
  margin-bottom: 1rem;
}

h1 {
  text-align: center;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input, select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
