<template>
  <the-navbar />
  <div class="container">
    <router-view v-show="showPage"></router-view>
    <base-spinner v-show="!showPage" />
  </div>
</template>

<script lang="ts" setup>
  import TheNavbar from '@/components/TheNavbar.vue'
  import { useStore } from 'vuex'
  import NProgress from 'nprogress'
  import { onBeforeMount, ref } from 'vue'

  const store = useStore()

  const showPage = ref(false)

  const onPageReady = () => {
    showPage.value = true
    NProgress.done()
  }

  onBeforeMount(async () => {
    NProgress.configure({
      speed: 200,
      showSpinner: false
    })
    NProgress.start()
    await store.dispatch('fetchAuthUser')
    onPageReady()
  })
</script>
