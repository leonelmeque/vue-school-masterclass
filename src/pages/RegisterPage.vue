<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form class="card card-form" @submit.prevent="register">
        <h1 class="text-center">Register</h1>
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            id="name"
            v-model="form.name"
            class="form-input"
            name="name"
            type="text"
          />
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="form.username"
            class="form-input"
            type="text"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label
          ><input
            id="email"
            v-model="form.email"
            class="form-input"
            type="email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label
          ><input
            id="password"
            v-model="form.password"
            class="form-input"
            type="password"
          />
        </div>
        <div class="form-group">
          <label for="avatar">Avatar</label
          ><input
            id="avatar"
            v-model="form.avatar"
            class="form-input"
            type="text"
          />
        </div>
        <div class="form-actions">
          <button class="btn-blue btn-block" type="submit">
            Register
          </button>
        </div>
      </form>
      <div class="text-center push-top">
        <button class="btn-red btn-xsmall">
          <i class="fa fa-google fa-btn"></i> Sign up with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'

  const form = ref({
    name: '',
    username: '',
    email: '',
    password: '',
    avatar: ''
  })

  const store = useStore()
  const router = useRouter()

  function register() {
    store.dispatch('registerUser', form.value)
    router.push('/')
  }
</script>
