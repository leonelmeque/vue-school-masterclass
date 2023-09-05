<template>
  <span class="post-date text-faded" :title="humanFriendlyDate()">
    {{ diffFormHumans() }}
  </span>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import localizeDate from 'dayjs/plugin/localizedFormat'

  const { timestamp } = defineProps<{ timestamp: number }>()

  dayjs.extend(relativeTime)
  dayjs.extend(localizeDate)

  function diffFormHumans() {
    return dayjs.unix(timestamp).fromNow()
  }

  function humanFriendlyDate() {
    return dayjs.unix(timestamp).format('L LT')
  }
</script>
