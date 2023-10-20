<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <UserProfileCard v-if="!edit" :user="user" />
        <UserProfileCardEditor v-else :user="user" />
        <p class="text-xsmall text-faded text-center">
          Member since june 2003, last visited 4 hours ago
        </p>
      </div>

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead">
            {{ user.username }} recent activity
          </span>
          <a href="#">See only started threads?</a>
        </div>
        <hr />
        <PostList :posts="user.posts" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import PostList from '@/components/PostList.vue'
  import type { Users } from '@/utils/shared-types'
  import UserProfileCard from '@/components/UserProfileCard.vue'
  import UserProfileCardEditor from '@/components/UserProfileCardEditor.vue'

  const { edit } = defineProps<{
    edit: boolean
  }>()

  const store = useStore()

  const user = computed<Users>(() => store.getters.authUser as Users)
</script>
