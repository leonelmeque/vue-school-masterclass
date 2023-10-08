<template>
  <div class="profile-card">
    <form @submit.prevent="save">
      <p class="text-center">
        <img
          :alt="`${user.name} profile picture`"
          :src="user.avatar"
          class="avatar-xlarge img-update"
        />
      </p>

      <div class="form-group">
        <input
          v-model="activeUser.username"
          class="form-input text-lead text-bold"
          placeholder="Username"
          type="text"
        />
      </div>

      <div class="form-group">
        <input
          v-model="activeUser.name"
          class="form-input text-lead"
          placeholder="Full Name"
          type="text"
        />
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          id="user_bio"
          v-model="activeUser.bio"
          class="form-input"
          placeholder="Write a few words about yourself."
        ></textarea>
      </div>

      <div class="stats">
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
      </div>

      <hr />

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input
          id="user_website"
          v-model="activeUser.website"
          autocomplete="off"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input
          id="user_email"
          v-model="activeUser.email"
          autocomplete="off"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input
          id="user_location"
          v-model="activeUser.location"
          autocomplete="off"
          class="form-input"
        />
      </div>

      <div class="btn-group space-between">
        <button class="btn-ghost" @click="cancel">Cancel</button>
        <button class="btn-blue" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import type { Users } from '@/utils/shared-types'
  import router from '@/router'

  const { user } = defineProps<{
    user: Users & { postsCount: number; threadsCount: number }
  }>()

  const store = useStore()
  const activeUser = ref({ ...user })

  function save() {
    store.dispatch('updateUser', { ...activeUser.value })
    router.push({ name: 'Profile' })
  }

  function cancel() {
    router.push({ name: 'Profile' })
  }
</script>
