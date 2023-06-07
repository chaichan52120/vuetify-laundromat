<template>
  <div class="col-12 col-sm-6 col-md-4 q-pa-xs">
    <v-card elevation="3" class="text-grey-darken-4" :color="data.isReaded ? '' : 'red-lighten-5'"
      style="cursor: pointer;" @click="store.updateNotification(data.id)">
      <div class="d-flex flex-no-wrap justify-space-between">
        <v-card-text class="text-left">
          {{ data.message }}
        </v-card-text>

        <v-card-text class="text-right">
          {{ data.created_at }}
        </v-card-text>
      </div>
    </v-card>
  </div>
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