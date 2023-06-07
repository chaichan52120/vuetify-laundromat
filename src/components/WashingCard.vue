<template lang="pug">
div
  v-card(elevation="3" :class="isHaveHistory() ? 'text-purple-darken-3' : 'text-grey-darken-4'")
    .d-flex.flex-no-wrap.justify-space-between
      .text-left
        v-card-title.text-h6 {{ data.name }}
        v-divider
        v-card-subtitle {{ data.rates }} บาท
        v-card-actions
          v-btn.ms-2(v-if="isWashing()" variant="outlined" color="red" size="small") Washing
          template(v-else)
            v-btn.ms-2(variant="outlined" color="green" size="small") Choose
              v-dialog(v-model="dialogConfirm" persistent activator="parent" width="auto")
                v-card
                  v-card-title แจ้งเตือน
                  v-select.mx-5.mt-3(v-if="creditCardStore.credit_data.length > 0" :items="creditCardStore.credit_data" item-children="test" variant="solo-filled" label="Credit Card" item-value="id" v-model="creditCard")
                    template(#item="{ item }")
                      v-list-item(:active="creditCard === item.value" :title="item.raw.fullName + ' ** ' + item.raw.cardNumber.substring(item.raw.cardNumber.length - 5)" @click="creditCard = item.value, creditCardStore.selected = item.value")
                    template(#selection="{ item }") {{ item.raw.fullName }} ** {{ item.raw.cardNumber.substring(item.raw.cardNumber.length - 5) }}
                  v-card-text.mt-3.text-red-darken-4(v-else) คุณยังไม่มี Credit Card เพิ่มบัตร
                    router-link.text-primary(to="/add-cash") คลิก
                  v-card-text คุณต้องการใช้งาน {{ props.data.name }} ในราคา {{ props.data.rates }} บาท หรือไม่?
                  v-card-actions
                    v-spacer
                    v-btn(color="grey" @click="dialogConfirm = false") Cancel
                    v-btn(:color="creditCard !== undefined ? 'primary' : 'grey-lighten-1'" variant="text" @click="creditCard !== undefined ? (dialogConfirm = false, store.addHistory(data)) : null") Ok
          .ml-2(v-show="isWashing() && store.history.filter((e) => e.id === data.id)[store.history.filter((e) => e.id === props.data.id).length - 1].timer > 0")
            count-down(:time_sec="isWashing() ? store.history.filter((e) => e.id === data.id)[store.history.filter((e) => e.id === props.data.id).length - 1].timer : 0")
      v-avatar.ma-2(size="100" rounded="0")
        v-icon(icon="mdi-washing-machine" size="90" start :color="isHaveHistory() ? 'purple-darken-3' : 'grey-darken-3'")
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'
import { useCreditCard } from '@/stores/creditCard'
import CountDown from "@/components/CountDown.vue"
import { ref, watch } from 'vue';
import { onMounted } from 'vue';
import type { machineType } from "@/interface/main";

const store = useStore()
const creditCardStore = useCreditCard()
const dialogConfirm = ref<boolean | undefined>()
const creditCard = ref<number | null>()

onMounted(() => {
  creditCard.value = creditCardStore.selected
},)

watch(creditCardStore, async () => {
  creditCard.value = creditCardStore.selected
})

const isWashing = () => {
  const history_length = store.history.filter((e) => e.id === props.data.id).length
  if (history_length > 0 && store.history.filter((e) => e.id === props.data.id)[history_length - 1].timer > 0) {
    return true
  } else {
    return false
  }
}

const isHaveHistory = () => {
  if (store.history.filter((e) => e.id === props.data.id).length > 0) {
    return true
  } else {
    return false
  }
}

const props = defineProps({
  data: {
    type: Object as () => machineType,
    default: null
  },
})
</script>