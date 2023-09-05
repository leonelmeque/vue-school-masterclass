<template>
  <ForumList
    v-for="category in categories"
    :key="category.id"
    :category-id="category.id"
    :category-name="category.name"
    :forums="getForumsForCateogry(category)"
  />
</template>
<script lang="ts" setup>
  import ForumList from './ForumList.vue'
  import sourceData from '../../data.json'

  const { categories } = defineProps<{
    categories: typeof sourceData.categories
  }>()

  function getForumsForCateogry(
    category: (typeof sourceData.categories)[0]
  ) {
    return sourceData.forums.filter(
      (forum) => forum.categoryId === category.id
    )
  }
</script>
