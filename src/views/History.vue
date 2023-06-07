<template>
  <v-container>
    <v-row class="py-5 px-3" dense>
      <v-col v-if="store.history.length > 0" v-for="(item, index) in store.history.slice().reverse()" :key="index" sm="12"
        md="6">
        <history-card :data="item" color="grey-lighten-2" height="96" />
      </v-col>
      <div v-else>ไม่มีประวัติการใช้งาน</div>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import HistoryCard from '@/components/HistoryCard.vue'
import { useStore } from '@/stores/store'

const store = useStore()
</script>