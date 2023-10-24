<template>
  <div v-if="isReady" class="col-large push-top">
    <h1>
      {{ thread?.title }}
    </h1>

    <p>
      By
      <a class="link-unstyled" href="#"> {{ thread?.author?.name }}</a
      >, <BaseDate :timestamp="thread?.publishedAt" />.
      <span
        class="hide-mobile text-faded text-small"
        style="float: right; margin-top: 2px"
        >{{ thread?.repliesCount }} replies by
        {{ thread?.contributorsCount }} contributors</span
      >
    </p>

    <router-link
      :to="{ name: 'ThreadEdit', params: { id } }"
      class="btn-green btn-small"
    >
      Edit Thread
    </router-link>
    <post-list :posts="threadPosts"></post-list>
    <post-editor :id="thread?.id" @save="addPost" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import type { Post } from '@/utils/shared-types'
  import PostList from '@/components/PostList.vue'
  import PostEditor from '@/components/PostEditor.vue'
  import { useStore } from 'vuex'
  import { useInitThreadShow } from '@/composables/use-init-thread-show'

  const { id } = defineProps({
    id: { type: String, required: true }
  })

  const store = useStore()

  const posts = computed(() => store.state.posts.items)

  const thread = computed(() => store.getters.thread(id))

  const threadPosts = computed(() =>
    posts.value.filter((p: any) => p.threadId === id)
  )

  const addPost = (post: Post) => {
    store.dispatch('createPost', { ...post, threadId: id })
  }

  const { isReady } = useInitThreadShow({ threadId: id })
</script>
