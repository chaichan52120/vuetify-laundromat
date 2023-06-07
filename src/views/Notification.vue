<template lang="pug">
v-container
  v-responsive.align-center.text-center.fill-height.pa-3
    v-row(dense)
      v-col(v-if="store.notification.length > 0" v-for="(item, index) in store.notification.slice().reverse()" :key="index" cols="12")
        notification-card(:data="item" color="grey-lighten-2" height="96")
      div(v-else) ไม่มีการแจ้งเตือน
</template>

<script lang="ts" setup>
import NotificationCard from '@/components/NotificationCard.vue'
import { useStore } from '@/stores/store'

const store = useStore()
</script>