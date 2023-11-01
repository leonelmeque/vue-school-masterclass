<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form class="card card-form" @submit.prevent="signIn">
        <h1 class="text-center">Login</h1>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            class="form-input"
            type="text"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            class="form-input"
            type="password"
          />
        </div>

        <div class="push-top">
          <button class="btn-blue btn-block" type="submit">
            Log in
          </button>
        </div>

        <div class="form-actions text-right">
          <router-link :to="{ name: 'Register' }"
            >Create an account?</router-link
          >
        </div>
      </form>

      <div class="push-top text-center">
        <button class="btn-red btn-xsmall" @click="signInWithGoogle">
          <i class="fa fa-google fa-btn"></i>Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { useAuthProvider } from '@/composables/use-auth-provider'

  const form = ref({
    email: '',
    password: ''
  })

  const store = useStore()
  const router = useRouter()
  const { signInWithGoogle } = useAuthProvider()

  const signIn = async () => {
    try {
      await store.dispatch('signInWithEmailAndPassword', {
        ...form.value
      })
      await router.push({ name: 'Home' })
    } catch (err) {
      alert(err.message)
    }
  }
</script>
