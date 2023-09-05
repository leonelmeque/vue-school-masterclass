<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="user-info">
        <a href="#" class="user-name"> {{ userById(post.userId)?.name }}</a>
        <a href="#">
          <img
            class="avatar-large"
            :src="userById(post.userId)?.avatar"
            :alt="`${userById(post.userId)?.name} avatar`"
          />
        </a>
        <p class="desktop-only text-small">{{ posts.length }} posts</p>
      </div>

      <div class="post-content">
        <div>
          <p>
            {{ post.text }}
          </p>
        </div>
      </div>
      <div class="post-date text-faded">
        <BaseDate :timestamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Post } from '@/utils/shared-types'
  import sourceData from '../../data.json'

  const { posts } = defineProps<{
    posts: Post[]
  }>()

  const users = ref(sourceData.users)

  function userById(userId?: string) {
    return users.value.find((u) => u.id === userId)
  }
</script>
