<template>
  <div class="login-form">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <label for="userId">Enter your ID:</label>
      <input
        type="text"
        id="userId"
        v-model="localUserId"
        placeholder="Enter alphanumeric ID"
        required
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const UserId = ref('');
const router = useRouter();

function handleLogin() {
  if (UserId.value) {
    userStore.setUserId(UserId.value);
    router.push('/wallet');
  }
}
</script>

<style scoped>
.login-form {
  max-width: 300px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h1 {
  text-align: center;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
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
