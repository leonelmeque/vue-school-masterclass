<template>
  <div v-if="isReady">
    <h1>{{ category?.name }}</h1>
    <ForumList
      :category-name="category?.name as 'Forums'"
      :forums="getForumsForCategory(category)"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue'
  import ForumList from '@/components/ForumList.vue'
  import { useStore } from 'vuex'
  import { findById } from '@/helpers'
  import { useAsyncDataStatus } from '@/composables/use-async-data-status'

  const { id } = defineProps<{
    id: string
  }>()

  const store = useStore()
  const { isReady, setReady } = useAsyncDataStatus()

  function getForumsForCategory(category: any) {
    return store.state.forums.filter(
      (forum) => forum['categoryId'] === category.id
    )
  }

  const category = computed(
    () =>
      findById<typeof store.state.categories>(
        store.state.categories,
        id
      ) || {}
  )

  onMounted(async () => {
    const _category = await store.dispatch('fetchCategory', { id })
    await store.dispatch('fetchForums', { ids: _category.forums })
    setReady()
  })
</script>
