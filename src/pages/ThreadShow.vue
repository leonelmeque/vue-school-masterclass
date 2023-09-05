<template>
  <div class="col-large push-top">
    <h2>
      {{ thread?.title }}
    </h2>
    <post-list :posts="threadPosts"></post-list>
    <post-editor :id="thread?.id" @save="addPost" />
  </div>
</template>

<script setup lang="ts">
  //@ts-ignore
  import sourceData from '../../data.json'
  import PostList from '@/components/PostList.vue'
  import PostEditor from '@/components/PostEditor.vue'
  import { computed, ref } from 'vue'
  import type { Post } from '../utils/shared-types'

  const { id } = defineProps({
    id: { type: String, required: true }
  })

  const threads = ref(sourceData.threads)
  const posts = ref(sourceData.posts)

  const thread = computed(() => threads.value.find((t) => t.id === id))
  const threadPosts = computed(() => posts.value.filter((p) => p.threadId === id))

  const addPost = (eventData: { post: Post }) => {
    posts.value.push(eventData.post)
    thread.value?.posts.push(eventData.post.id)
  }
</script>
