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
  import { useStore } from 'vuex'

  const store = useStore()
  const { categories } = defineProps<{
    categories: typeof store.state.categories
  }>()

  function getForumsForCateogry(
    category: (typeof store.state.categories)[0]
  ) {
    return store.state.forums.filter(
      (forum) => forum.categoryId === category.id
    )
  }
</script>
