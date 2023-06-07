<template>
  <div>
    <v-card elevation="3" :class="data.timer > 0 ? 'text-primary' : 'text-grey-darken-4'">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div class="text-left">
          <v-card-title class="text-h5">
            {{ data.name }}
          </v-card-title>

          <v-divider />

          <v-card-subtitle>{{ data.rates }} บาท</v-card-subtitle>

          <v-card-actions class="ml-2">
            {{ data.timer > 0 ? 'กำลังซัก' : 'สำเร็จ' }}

            <div class="ml-2" v-show="data.timer > 0">
              <count-down :time_sec="data.timer" />
            </div>
          </v-card-actions>
        </div>

        <v-avatar class="ma-2" size="100" rounded="0">
          <v-icon icon="mdi-washing-machine" size="90" start
            :color="data.timer > 0 ? 'primary' : 'grey-darken-3'" />
        </v-avatar>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import CountDown from "@/components/CountDown.vue"

const props = defineProps({
  data: {
    type: Object,
    default: ''
  },
})
</script>