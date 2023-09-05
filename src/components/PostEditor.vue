<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea name="" id="" cols="30" rows="10" class="form-input" v-model="text"></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue" :disabled="shouldButtonEnable">Submit post</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import type { Post } from '@/utils/shared-types'
  import { computed, ref } from 'vue'

  const { id } = defineProps<{ id?: string }>()

  const emit = defineEmits(['save'])

  const text = ref('')

  const save = () => {
    const postId = 'xyz' + Math.random()
    const post: Post = {
      text: text.value,
      publishedAt: Math.floor(Date.now() / 1000),
      threadId: id as string,
      userId: '38St7Q8Zi2N1SPa5ahzssq9kbyp1',
      id: postId
    }

    text.value = ''
    emit('save', { post })
  }

  const shouldButtonEnable = computed(() => text.value.length < 3)
</script>
