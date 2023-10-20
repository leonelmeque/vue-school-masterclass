<template>
  <the-navbar />
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
  import TheNavbar from '@/components/TheNavbar.vue'
  import { useStore } from 'vuex'
  import { onBeforeMount } from 'vue'

  const store = useStore()

  onBeforeMount(async () => {
    await store.dispatch('fetchAuthUser')
  })
</script>
