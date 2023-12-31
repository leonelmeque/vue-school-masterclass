<template>
  <div v-if="isReady && text" class="col-full push-top">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>
    <ThreadEditor
      :text="text"
      :title="thread.title"
      @cancel="cancel"
      @clean="formIsDirty = false"
      @dirty="formIsDirty = true"
      @save="save"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import { onBeforeRouteLeave, useRouter } from 'vue-router'
  import ThreadEditor from '@/components/ThreadEditor.vue'
  import { findById } from '@/utils'
  import { useAsyncDataStatus } from '@/composables/use-async-data-status'

  const { id } = defineProps<{ id: string }>()

  const store = useStore()
  const { isReady, setReady } = useAsyncDataStatus()
  const router = useRouter()

  const formIsDirty = ref(false)

  const thread = computed(() => {
    return findById<typeof store.state.threads>(
      store.state.threads.items,
      id
    )
  })

  const text = computed(() => {
    const post = findById<typeof store.state.posts>(
      store.state.posts.items,
      thread.value.posts[0]
    )

    return post ? post.text : ''
  })

  async function save({
    title,
    text
  }: {
    title: string
    text: string
  }) {
    await store.dispatch('updateThread', {
      id: id,
      title,
      text
    })
    await router.push({
      name: 'ThreadShow',
      params: { id }
    })
  }

  async function cancel() {
    await router.push({
      name: 'ThreadShow',
      params: { id }
    })
  }

  onMounted(async () => {
    await store.dispatch('fetchThread', { id })
    await store.dispatch('fetchPosts', {
      ids: thread.value?.posts
    })
    setReady()
  })

  onBeforeRouteLeave(() => {
    if (formIsDirty.value) {
      const confirmed = window.confirm(
        'Are you sure you want to leave? Unsaved changes will be lost!'
      )
      if (!confirmed) return false
    }
  })
</script>
