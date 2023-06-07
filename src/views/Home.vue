<template>
  <v-container>
    <v-row class="py-5 px-3" dense>
      <v-col v-for="item in machineList" :key="item.id" sm="12" md="6">
        <washing-card :data="item" color="grey-lighten-2" height="96"></washing-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import WashingCard from '@/components/WashingCard.vue'
import { machineList } from "@/interface/main";
</script>
