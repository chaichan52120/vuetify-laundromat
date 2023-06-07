<template lang="pug">
.col-12.col-sm-6.col-md-4.q-pa-xs
  v-card.text-grey-darken-4(elevation="3" :color="data.isReaded ? '' : 'red-lighten-5'" style="cursor: pointer;" @click="store.updateNotification(data.id)")
    .d-flex.flex-no-wrap.justify-space-between
      v-card-text.text-left {{ data.message }}
      v-card-text.text-right {{ data.created_at }}
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'

const store = useStore()

defineProps({
  data: {
    type: Object,
    default: ''
  },
})
</script>