<script>
import axios from 'axios';

export default {
  data() {
    return {
      events: [],
      eventToUpdate: {
        folowed_user:
            {
              id: -1
            }
      },
      eventToCreate: {},
      relatedUsers: [],
      redacted: false,
    };
  },
  methods: {
    formatDate(date) {
      let d = new Date(date)

      const hours = d.getHours().toString().padStart(2, '0');
      const minutes = d.getMinutes().toString().padStart(2, '0');

      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = d.getFullYear();

      return `${hours}:${minutes} ${day}.${month}.${year}`;
    },
    goPage(name) {
      this.$router.push({
        'name': name
      })
    },
    eventUpdate(event) {
      this.eventToUpdate = event;
      this.redacted = true;
    },
    async loadRelatedUsers() {
      if (localStorage.getItem('role') === 'ROLE_STUDENT') {
        await axios.get('/student/teachers', {
          headers: {
            'Authorization': `Bearer ${localStorage.accessToken}`
          }
        }).then(response => {
          this.relatedUsers = response.data.teachers;
        })
      } else if (localStorage.getItem('role') === 'ROLE_TEACHER') {
        await axios.get('/teacher/students', {
          headers: {
            'Authorization': `Bearer ${localStorage.accessToken}`
          }
        }).then(response => {
          this.relatedUsers = response.data.students;
        })
      }
    },
    async loadEvents() {
      await axios.get('/myevents', {
        headers: {
          'Authorization': `Bearer ${localStorage.accessToken}`
        }
      }).then(response => {
        this.events = response.data.ownerEvents;
      })
    },
    async deleteEvent(eventId) {
      await axios.delete('/delete/event/' + eventId, {
        headers: {
          'Authorization': `Bearer ${localStorage.accessToken}`
        }
      }).then(response => {
        this.loadEvents();
      })
    },
    async createEvent($evt) {
      $evt.preventDefault();
      this.eventToCreate.date_created = new Date();
      await axios.post('/addevent', this.eventToCreate, {
        headers: {
          'Authorization': `Bearer ${localStorage.accessToken}`
        }
      }).then(response => {
        this.loadEvents();
      })
    },
    async updateEvent($evt) {
      $evt.preventDefault();
      this.eventToUpdate.date_created = new Date();
      await axios.put('/update/event', this.eventToUpdate, {
        headers: {
          'Authorization': `Bearer ${localStorage.accessToken}`
        }
      }).then(response => {
        this.loadEvents();
      })
    },
  },
  mounted() {
    this.loadEvents();
    this.loadRelatedUsers();
  },
};
</script>

<template>
  <div class="container">
    <h2 class="text-center my-5">Ближайшие события</h2>
    <h5 class="text-center text-secondary my-5" v-if="events.length === 0">Создайте событие</h5>
    <div v-for="event in events">
      <div class="row fw-bold">
        <div class="col-2">Организатор</div>
        <div class="col-2">Название</div>
        <div class="col-3">Описание</div>
        <div class="col-2">Гость</div>
        <div class="col-1">Начало</div>
        <div class="col-1">Конец</div>
      </div>
      <div class="row">
        <div class="col-2">{{ event.user.email }}</div>
        <div class="col-2">{{ event.name }}</div>
        <div class="col-3">{{ event.description }}</div>
        <div class="col-2">{{ event.folowed_user.email }}</div>
        <div class="col-1">{{ formatDate(event.date) }}</div>
        <div class="col-1">{{ formatDate(event.duration) }}</div>
        <div class="col-1">
          <div class="text-danger" @click="deleteEvent(event.id)">Удалить</div>
          <div @click="eventUpdate(event)"><a class="text-success" href="#update">Обновить</a></div>
        </div>
      </div>
    </div>

    <h2 class="text-center my-5">Создать новое событие</h2>
    <form id="eventForm">
      <div class="mb-3">
        <label for="date" class="form-label">Начало</label>
        <input type="datetime-local" class="form-control" id="date" name="date" required
               v-model="eventToCreate.date">
      </div>
      <div class="mb-3">
        <label for="duration" class="form-label">Окончание</label>
        <input type="datetime-local" class="form-control" id="duration" name="date" required
               v-model="eventToCreate.duration">
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Название</label>
        <input type="text" class="form-control" id="name" name="name" placeholder="Введите название события" required
               v-model="eventToCreate.name">
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Описание</label>
        <input type="text" class="form-control" id="description" name="name" placeholder="Введите описание события"
               required
               v-model="eventToCreate.description">
      </div>
      <div class="mb-3">
        <label for="gettingPersonId" class="form-label">Получатель</label>
        <select
            v-model="eventToCreate.getingPersonId"
            class="form-select"
            id="gettingPersonId"
            required>
          <option
              v-for="user in relatedUsers"
              :value="user.user.id">{{ user.user.email }}
          </option>
        </select>
      </div>
      <button class="btn btn-secondary" @click="createEvent">Создать событие</button>
    </form>

    <h2
        id="update"
        class="text-center my-5"
        :class="{
      'd-none': !redacted,
    }">Обновить событие</h2>
    <form id="eventForm" :class="{
      'd-none': !redacted,
    }">
      <div class="mb-3">
        <label for="date" class="form-label">Начало</label>
        <input type="datetime-local" class="form-control" id="date" name="date" required
               v-model="eventToUpdate.date">
      </div>
      <div class="mb-3">
        <label for="duration" class="form-label">Окончание</label>
        <input type="datetime-local" class="form-control" id="duration" name="date" required
               v-model="eventToUpdate.duration">
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Название</label>
        <input type="text" class="form-control" id="name" name="name" placeholder="Введите название события" required
               v-model="eventToUpdate.name">
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Описание</label>
        <input type="text" class="form-control" id="description" name="name" placeholder="Введите название события"
               required
               v-model="eventToUpdate.description">
      </div>
      <div class="mb-3">
        <label for="gettingPersonId" class="form-label">Получатель</label>
        <select
            v-model="eventToUpdate.getingPersonId"
            class="form-select"
            id="gettingPersonId"
            required>
          <option
              v-for="user in relatedUsers"
              :value="user.user.id"
              :selected="user.user.id === eventToUpdate.folowed_user.id">{{ user.user.email }}
          </option>
        </select>
      </div>
      <button class="btn btn-secondary" @click="updateEvent">Сохранить событие</button>
    </form>
  </div>
</template>

<style scoped>
</style>