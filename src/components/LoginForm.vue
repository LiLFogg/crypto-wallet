<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Username" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const username = ref('');
const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    await userStore.login(username.value);
    router.push('/wallet'); 
  } catch (error) {
    console.error('Login failed:', error);
    alert('Error:', error);
  }
};
</script>

<style scoped>
.login-form {
  max-width: 300px;
  height: 600px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}


img{
  width: 300px;
}

h1 {
  text-align: center;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 80%;
  padding: 0.5rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background-color: #ff8800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
}

button:hover {
  background-color: #0056b3;
}
</style>
