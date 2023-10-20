<template>
  <span :title="humanFriendlyDate" class="post-date text-faded">
    {{ diffFormHumans }}
  </span>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import localizeDate from 'dayjs/plugin/localizedFormat'
  import { computed } from 'vue'

  type Timestamp = { seconds: number }

  const { timestamp } = defineProps<{
    timestamp: Timestamp | number
  }>()

  dayjs.extend(relativeTime)
  dayjs.extend(localizeDate)

  const diffFormHumans = computed(() =>
    dayjs
      .unix(
        (timestamp as Timestamp)?.seconds || (timestamp as number)
      )
      .fromNow()
  )

  const humanFriendlyDate = computed(() =>
    dayjs
      .unix(
        (timestamp as Timestamp)?.seconds || (timestamp as number)
      )
      .format('L LT')
  )
</script>
