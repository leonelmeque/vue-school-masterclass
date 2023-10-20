<template>
  <div v-if="isReady" class="col-full">
    <div v-if="forum" class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{ forum?.name }}</h1>
          <p class="text-lead">{{ forum?.description }}</p>
        </div>
        <router-link
          :to="{
            name: 'ThreadCreate',
            params: { forumId: forum?.id }
          }"
          class="btn-green btn-small"
          href=""
          >Start a thread</router-link
        >
      </div>
    </div>

    <div class="col-full push-top">
      <ThreadList v-if="threads" :threads="threads" />
    </div>
  </div>
</template>
†

<script lang="ts" setup>
  import ThreadList from '@/components/ThreadList.vue'

  import { computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { findById } from '@/helpers'
  import { useAsyncDataStatus } from '@/composables/use-async-data-status'

  const props = defineProps<{
    id: string
  }>()

  const store = useStore()
  const { isReady, setReady } = useAsyncDataStatus()

  const forum = computed(() => findById(store.state.forums, props.id))

  const threads = computed(() => {
    if (!forum.value) return []

    return forum?.value?.threads.map((threadsId: string) =>
      store.getters.thread(threadsId)
    )
  })

  onMounted(async () => {
    await store.dispatch('fetchForum', { id: props.id })
    await store.dispatch('fetchThreads', {
      ids: forum.value?.threads
    })

    await store.dispatch('fetchUsers', {
      ids: threads.value.map((thread: any) => thread.userId)
    })
    setReady()
  })
</script>
