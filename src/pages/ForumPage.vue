<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum?.name }}</h1>
        <p class="text-lead">{{ forum?.description }}</p>
      </div>
      <a class="btn-green btn-small" href="">Start a thread</a>
    </div>
  </div>

  <div class="col-full push-top">
    <ThreadList :threads="threads" />
  </div>
</template>

<script lang="ts" setup>
  import ThreadList from '@/components/ThreadList.vue'
  import sourceData from '../../data.json'
  import { computed } from 'vue'

  const props = defineProps<{
    id: string
  }>()

  const forum = computed(() =>
    sourceData.forums.find((forum) => forum.id === props.id)
  )

  const threads = computed(() =>
    sourceData.threads.filter((thread) => thread.forumId === props.id)
  )
</script>
