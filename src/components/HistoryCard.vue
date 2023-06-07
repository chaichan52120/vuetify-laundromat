<template lang="pug">
div
  v-card(elevation="3" :class="data.timer > 0 ? 'text-primary' : 'text-grey-darken-4'")
    div.d-flex.flex-no-wrap.justify-space-between
      div.text-left
        v-card-title.text-h5 {{ data.name }}
        v-divider
        v-card-subtitle {{ data.rates }} บาท
        v-card-actions.ml-2 {{ data.timer > 0 ? 'กำลังซัก' : 'สำเร็จ' }}
          div.ml-2(v-show="data.timer > 0")
            count-down(:time_sec="data.timer")
      v-avatar.ma-2(size="100" rounded="0")
        v-icon(icon="mdi-washing-machine" size="90" start :color="data.timer > 0 ? 'primary' : 'grey-darken-3'")
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