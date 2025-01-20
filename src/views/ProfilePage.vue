<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        email: '',
        firstName: '',
        lastName: '',
        avatar: '',
        extra_info: '',
      }
    }
  },
  methods: {
    async loadProfile() {
      await axios.get('/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.accessToken}`
        }
      }).then(response => {
        this.user = response.data.user;
      })
    },
    async updateProfile($evt) {
      $evt.preventDefault();
      await axios.put('/profile/update', {
        avatar: this.user.avatar,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        extraInfo: this.user.extraInfo,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.accessToken}`
        }
      }).then(response => {
        this.loadProfile();
      })
    },
  },
  mounted() {
    this.loadProfile()
  }
}
</script>

<template>
  <form class="container mt-5">
    <h2 class="mb-4">Профиль пользователя</h2>
    <div class="mb-3">
      <label for="email" class="form-label fw-bold">ID:</label>
      <input type="email" id="email" class="form-control" v-model="user.id" disabled>
    </div>
    <div class="mb-3">
      <label for="avatar" class="form-label fw-bold">Аватар:</label>
      <img v-if="user.avatar" :src="user.avatar" alt="аватар" width="256px">
      <input type="url" id="avatar" class="form-control" v-model="user.avatar">
    </div>
    <div class="mb-3">
      <label for="email" class="form-label fw-bold">Email:</label>
      <input type="email" id="email" class="form-control" v-model="user.email" disabled>
    </div>
    <div class="mb-3">
      <label for="firstName" class="form-label fw-bold">Имя:</label>
      <input type="text" id="firstName" class="form-control" v-model="user.firstName">
    </div>
    <div class="mb-3">
      <label for="lastName" class="form-label fw-bold">Фамилия:</label>
      <input type="text" id="lastName" class="form-control" v-model="user.lastName">
    </div>
    <div class="mb-3">
      <label for="role" class="form-label fw-bold">Роль:</label>
      <select
          v-model="user.role"
          class="form-select"
          id="role"
          required
          disabled>
        <option value="ROLE_STUDENT">Ученик</option>
        <option value="ROLE_TEACHER">Учитель</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="additionalInfo" class="form-label fw-bold">Дополнительная информация:</label>
      <textarea id="additionalInfo" class="form-control" rows="3" v-model="user.extraInfo"></textarea>
    </div>
    <button class="btn btn-secondary" @click="updateProfile">Обновить профиль</button>
  </form>
</template>

<style scoped>

</style>