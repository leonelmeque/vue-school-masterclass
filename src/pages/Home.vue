<template>
  <div v-if="ready" class="container">
    <h1 class="push-top">Welcome to the Forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onBeforeMount, ref } from 'vue'
  import CategoryList from '@/components/CategoryList.vue'
  import { useStore } from 'vuex'
  import type { SourceData } from '@/utils/shared-types'

  const store = useStore<SourceData>()

  const categories = computed(() => store.state.categories)
  const ready = ref(false)

  onBeforeMount(async () => {
    const categories = await store.dispatch('fetchAllCategories')
    const forumIds = categories
      .map((category: any) => category.forums)
      .flat()
    await store.dispatch('fetchForums', { ids: forumIds })

    ready.value = true
  })
</script>
Ω
