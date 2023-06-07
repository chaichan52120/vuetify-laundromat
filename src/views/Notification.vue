<template>
  <v-container>
    <v-responsive class="align-center text-center fill-height pa-3">
      <v-row dense>
        <v-col v-if="store.notification.length > 0" v-for="(item, index) in store.notification.slice().reverse()"
          :key="index" cols="12">
          <notification-card :data="item" color="grey-lighten-2" height="96" />
        </v-col>

        <div v-else>ไม่มีการแจ้งเตือน</div>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import NotificationCard from '@/components/NotificationCard.vue'
import { useStore } from '@/stores/store'

const store = useStore()
</script>