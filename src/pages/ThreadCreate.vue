<template>
  <div v-if="isReady" class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum?.name }}</i>
    </h1>

    <ThreadEditor @cancel="cancel" @save="save" />
  </div>
</template>

<script lang="ts" setup>
  import { useStore } from 'vuex'
  import ThreadEditor from '@/components/ThreadEditor.vue'
  import { useRouter } from 'vue-router'
  import { computed, onMounted } from 'vue'
  import { findById } from '@/utils'
  import { useAsyncDataStatus } from '@/composables/use-async-data-status'

  const { forumId } = defineProps<{ forumId: string }>()

  const store = useStore()
  const router = useRouter()
  const { setReady, isReady } = useAsyncDataStatus()

  const forum = computed(() => {
    return findById<typeof store.state.forums>(
      store.state.forums,
      forumId
    )
  })

  async function save({
    title,
    text
  }: {
    title: string
    text: string
  }) {
    const thread = await store.dispatch('createThread', {
      title: title,
      text: text,
      forumId: forumId
    })

    await router.push({
      name: 'ThreadShow',
      params: { id: thread.id }
    })
  }

  async function cancel() {
    await router.push({
      name: 'ForumPage',
      params: { id: forum.value.id }
    })
  }

  onMounted(() => {
    store.dispatch('fetchForum', { id: forumId })
    setReady()
  })
</script>
