<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title</label
      ><input
        id="thread_title"
        v-model="form.title"
        class="form-input"
        name="title"
        type="text"
      />
    </div>

    <div class="form-group">
      <label for="thread_content">Content</label
      ><textarea
        id="thread_content"
        v-model="form.text"
        class="form-input"
        cols="140"
        name="content"
        rows="8"
      />
    </div>

    <div class="btn-group">
      <button class="btn btn-ghost" @click.prevent="$emit('cancel')">
        Cancel
      </button>
      <button
        class="btn btn-blue"
        name="Publish"
        type="submit"
        @click.prevent="save"
      >
        {{ existing ? 'Update' : 'Publish' }}
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'

  const { title = '', text = '' } = defineProps<{
    title: string
    text: string
  }>()
  const emit = defineEmits<{
    (e: 'save', props: { title: string; text: string }): void
  }>()

  const form = ref({
    title,
    text
  })

  const existing = computed(() => !!title)

  function save() {
    emit('save', {
      ...form.value
    })
  }
</script>
