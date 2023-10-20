<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post">
      <div v-if="userById(post.userId)" class="user-info">
        <a class="user-name" href="#">
          {{ userById(post.userId)?.name }}</a
        >
        <a href="#">
          <img
            :alt="`${userById(post.userId)?.name} avatar`"
            :src="userById(post.userId)?.avatar"
            class="avatar-large"
          />
        </a>
        <p class="desktop-only text-small">
          {{ userById(post.userId).postsCount }} posts
        </p>
        <p class="desktop-only text-small">
          {{ userById(post.userId).threadsCount }} threads
        </p>
      </div>

      <div class="post-content">
        <div class="col-full">
          <post-editor
            v-if="editing === post.id"
            :key="post.id"
            :post="post"
            @save="handleUpdatePost"
          >
          </post-editor>
          <p>
            {{ post.text }}
          </p>
        </div>
        <a
          v-if="post.userId === store.state.authId"
          class="link-unstyled"
          href="#"
          style="margin-left: auto; padding-left: 10px"
          title="Make a change"
          @click.prevent="toggleEditMode(post.id)"
        >
          <fa icon="pencil-alt" />
        </a>
      </div>
      <div class="post-date text-faded">
        <div v-if="post.edited?.at" class="edition-info">edited</div>
        <BaseDate :timestamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Post } from '@/utils/shared-types'
  import { useStore } from 'vuex'
  import PostEditor from '@/components/PostEditor.vue'
  import { ref } from 'vue'

  const { posts } = defineProps<{
    posts: Post[]
  }>()

  const editing = ref<string | null>(null)

  const store = useStore()

  function userById(userId?: string) {
    return store.getters.user(userId)
  }

  function toggleEditMode(id: string) {
    editing.value = editing.value === id ? null : id
  }

  async function handleUpdatePost({ id, text }: any) {
    await store.dispatch('updatePost', { id, text })
  }
</script>
