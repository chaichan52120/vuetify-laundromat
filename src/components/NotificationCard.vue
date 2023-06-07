<template lang="pug">
.col-12.col-sm-6.col-md-4.q-pa-xs
  v-card.text-grey-darken-4(elevation="3" :color="cardColor" style="cursor: pointer;" @click="store.updateNotification(data.id)")
    .d-flex.flex-no-wrap.justify-space-between
      v-card-text.text-left {{ data.message }}
      v-card-text.text-right {{ data.created_at }}
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'
import { computed } from 'vue';

const store = useStore()
const cardColor = computed(() => props.data.isReaded ? '' : 'red-lighten-5')

const props = defineProps({
  data: {
    type: Object,
    default: ''
  },
})
</script>