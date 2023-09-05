<script setup lang="ts">
  //@ts-ignore
  import sourceData from '../../data.json'
  import { ref } from 'vue'
  import CategoryList from '@/components/CategoryList.vue'

  const categories = ref(sourceData.categories)
</script>

<template>
  <h1>Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
</template>
