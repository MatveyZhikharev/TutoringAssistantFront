<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        role: '',
      },
      message: '',
      successful: false
    };
  },
  methods: {
    async register() {
      await axios.post('/registration', this.user)
          .then(response => {
            this.message = response.data;
            this.successful = true;
            this.$router.push({'name': 'login'});
          })
          .catch(error => {
            this.message = error.response.data;
            this.successful = false;
          });
    }
  }
};
</script>

<template>
  <div class="container w-50">
    <h2 class="text-center mt-3">Регистрация</h2>
    <form @submit.prevent="register">
      <div class="form-group d-flex flex-column gap-2">
        <label for="email">Электронная почта:</label>
        <input
            id="email"
            v-model="user.email"
            type="email"
            class="form-control"
            required
        />
        <label for="password">Пароль:</label>
        <input
            id="password"
            v-model="user.password"
            type="password"
            class="form-control"
            required
        />
        <label for="state" class="form-label">Роль:</label>
        <select
            v-model="user.role"
            class="form-select"
            id="state"
            required>
          <option value="ROLE_STUDENT">Ученик</option>
          <option value="ROLE_TEACHER">Учитель</option>
        </select>
        <button type="submit" class="btn btn-secondary">Зарегистрироваться</button>
      </div>


      <div v-if="message" :class="['alert', successful ? 'alert-success' : 'alert-danger']">
        {{ message.message }}
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>