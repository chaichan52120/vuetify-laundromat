<template lang="pug">
div
  v-card(elevation="3" :class="cardColor")
    div.d-flex.flex-no-wrap.justify-space-between
      div.text-left
        v-card-title.text-h5 {{ data.name }}
        v-divider
        v-card-subtitle {{ data.rates }} บาท
        v-card-actions.ml-2 {{ textStatus }}
          div.ml-2(v-show="data.timer > 0")
            count-down(:time_sec="data.timer")
      v-avatar.ma-2(size="100" rounded="0")
        v-icon(icon="mdi-washing-machine" size="90" start :color="iconColor")
</template>

<script setup lang="ts">
import CountDown from "@/components/CountDown.vue"
import { computed } from "vue";

const cardColor = computed(() => props.data.timer > 0 ? 'text-primary' : 'text-grey-darken-4')
const iconColor = computed(() => props.data.timer > 0 ? 'primary' : 'grey-darken-3')
const textStatus = computed(() => props.data.timer > 0 ? 'กำลังซัก' : 'สำเร็จ')

const props = defineProps({
  data: {
    type: Object,
    default: ''
  },
})
</script>