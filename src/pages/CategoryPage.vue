<template>
  <h1>{{ category?.name }}</h1>
  <ForumList
    :category-name="category?.name as 'Forums'"
    :forums="getForumsForCategory(category)"
  />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import sourceData from '../../data.json'
  import ForumList from '@/components/ForumList.vue'

  const { id } = defineProps<{
    id: string
  }>()

  function getForumsForCategory(category: any) {
    return sourceData.forums.filter(
      (forum) => forum['categoryId'] === category.id
    )
  }

  const category = computed(() =>
    sourceData.categories.find((cat) => cat.id === id)
  )
</script>
