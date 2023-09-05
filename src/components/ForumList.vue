<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">
        <router-link
          v-if="categoryId"
          :to="{ name: 'Category', params: { id: categoryId } }"
          href="#"
          >{{ categoryName }}</router-link
        >
        <span v-else>{{ categoryName }}</span>
      </h2>

      <div
        v-for="forum in forums"
        :key="forum.id"
        class="forum-listing"
      >
        <div class="forum-details">
          <router-link
            :to="{ name: 'Forum', params: { id: forum.id } }"
            class="text-xlarge"
          >
            {{ forum.name }}
          </router-link>
          <p>{{ forum.description }}</p>
        </div>

        <div class="threads-count">
          <p>
            <span class="count">{{ forum.threads?.length }}</span>
            {{ forumThreadsWord(forum) }}
          </p>
        </div>

        <div class="last-thread"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const {
    forums,
    categoryName = 'Forums',
    categoryId
  } = defineProps<{
    forums: any[]
    categoryName: string
    categoryId?: string
  }>()

  const forumThreadsWord = (forum: any) =>
    forum.threads?.length
      ? forum.threads?.length > 1
        ? 'Threads'
        : 'Thread'
      : 'No threads'
</script>
