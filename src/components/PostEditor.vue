<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          id=""
          v-model="postCopy.text"
          class="form-input"
          cols="30"
          name=""
          rows="10"
        ></textarea>
      </div>
      <div class="form-actions">
        <button :disabled="shouldButtonEnable" class="btn-blue">
          {{ post?.id ? 'Update Post' : 'Submit post' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'

  const { post = { text: '', id: '' } } = defineProps<{
    post?: any
  }>()

  const emit = defineEmits(['save'])

  const postCopy = ref({ ...post })

  const save = () => {
    emit('save', { ...postCopy.value })
    postCopy.value.text = ''
  }

  const shouldButtonEnable = computed(
    () => postCopy.value.text.length < 3
  )
</script>
