<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <div v-for="thread in threads" :key="thread?.id" class="thread">
        <div>
          <p>
            <router-link
              :to="{ name: 'ThreadShow', params: { id: thread?.id } }"
              >{{ thread?.title }}</router-link
            >
          </p>
          <p class="text-faded text-xsmall">
            By <a href="#">{{ userById(thread?.userId)?.name }}</a
            >, <BaseDate :timestamp="thread?.publishedAt" />.
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">
            {{ thread?.repliesCount }} replies
          </p>

          <img
            :src="userById(thread?.userId)?.avatar"
            alt=""
            class="avatar-medium"
          />

          <div>
            <p class="text-xsmall">
              <a href="#">{{ userById(thread?.userId)?.name }}</a>
            </p>
            <BaseDate :timestamp="thread?.publishedAt" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { findById } from '@/helpers'

  const store = useStore()

  const { threads } = defineProps<{
    threads: typeof store.state.users
  }>()

  const users = ref(store.state.users)

  function userById(userId?: string) {
    return (
      findById<typeof users.value>(users.value, userId as string) ||
      {}
    )
  }
</script>
