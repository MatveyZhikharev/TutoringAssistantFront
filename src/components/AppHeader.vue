<script>
export default {
  data() {
    return {
      email: '',
      role: ''
    };
  },
  methods: {
    goPage(name) {
      this.$router.push({
        'name': name
      })
    }
  },
  mounted() {
    this.email = localStorage.getItem('email');
    this.role = localStorage.getItem('role');
  }
}

</script>

<template>
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <div class="logo d-flex align-items-center">
            <img
                src="/src/assets/logo-white.svg"
                class="logo-img"
                width="50px">
            <span class="fs-4">Tutoring assistant</span>
          </div>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto ms-lg-auto mb-2 justify-content-center mb-md-0 gap-5">
          <li>
            <a
                class="nav-link px-2"
                @click="goPage('main')"
                :class="{
                  'text-secondary': $route.name === 'main',
                  'text-white': $route.name !== 'main'
                }"
            >Главная</a>
          </li>
          <li>
            <a
                v-if="role === 'ROLE_TEACHER'"
                class="nav-link px-2"
                @click="goPage('students')"
                :class="{
                  'text-secondary': $route.name === 'students',
                  'text-white': $route.name !== 'students'
                }"
            >Ученики</a>
            <a
                v-else
                class="nav-link px-2"
                @click="goPage('teachers')"
                :class="{
                  'text-secondary': $route.name === 'teachers',
                  'text-white': $route.name !== 'teachers'
                }"
            >Учителя</a>
          </li>
          <li>
            <a
                class="nav-link px-2"
                @click="goPage('resources')"
                :class="{
                  'text-secondary': $route.name === 'resources',
                  'text-white': $route.name !== 'resources'
                }"
            >Материалы</a>
          </li>
        </ul>

        <div class="text-end" v-if="!email">
          <button
              type="button"
              class="btn btn-outline-light me-2"
              @click="goPage('login')">Войти
          </button>
          <button
              type="button"
              class="btn btn-secondary"
              @click="goPage('register')">Зарегистрироваться
          </button>
        </div>
        <div v-else>
          <a @click="goPage('profile')">{{ email }}</a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>