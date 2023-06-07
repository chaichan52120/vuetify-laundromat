<template>
  <div>
    <v-card elevation="3" :class="isHaveHistory() ? 'text-purple-darken-3' : 'text-grey-darken-4'">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div class="text-left">
          <v-card-title class="text-h6">
            {{ data.name }}
          </v-card-title>

          <v-divider />

          <v-card-subtitle>{{ data.rates }} บาท</v-card-subtitle>

          <v-card-actions>
            <v-btn v-if="isWashing()" class="ms-2" variant="outlined" color="red" size="small">
              Washing
            </v-btn>

            <template v-else>
              <v-btn class="ms-2" variant="outlined" color="green" size="small">
                Choose

                <v-dialog v-model="dialogConfirm" persistent activator="parent" width="auto">
                  <v-card>
                    <v-card-title>แจ้งเตือน</v-card-title>
                    <v-select v-if="creditCardStore.credit_data.length > 0" :items="creditCardStore.credit_data"
                      item-children="test" variant="solo-filled" label="Credit Card" class="mx-5 mt-3" item-value="id"
                      v-model="creditCard">
                      <template #item="{ item }">
                        <v-list-item :active="creditCard === item.value"
                          :title="item.raw.fullName + ' ** ' + item.raw.cardNumber.substring(item.raw.cardNumber.length - 5)"
                          @click="creditCard = item.value, creditCardStore.selected = item.value" />
                      </template>

                      <template #selection="{ item }">
                        {{ item.raw.fullName }} **
                        {{ item.raw.cardNumber.substring(item.raw.cardNumber.length - 5) }}
                      </template>
                    </v-select>

                    <v-card-text v-else class="mt-3 text-red-darken-4">คุณยังไม่มี Credit Card เพิ่มบัตร <router-link
                        class="text-primary" to="/add-cash">คลิก</router-link></v-card-text>

                    <v-card-text>คุณต้องการใช้งาน {{ props.data.name }} ในราคา {{ props.data.rates }} บาท
                      หรือไม่?</v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="grey" @click="dialogConfirm = false">Cancel</v-btn>

                      <v-btn :color="creditCard !== undefined ? 'primary' : 'grey-lighten-1'" variant="text"
                        @click="creditCard !== undefined ? (dialogConfirm = false, store.addHistory(data)) : null">Ok</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>
            </template>

            <div class="ml-2" v-show="isWashing() && store.history.filter((e) => e.id ===
              data.id)[store.history.filter((e) => e.id === props.data.id).length - 1].timer > 0
              ">
              <count-down :time_sec="isWashing() ? store.history.filter((e) => e.id ===
                data.id)[store.history.filter((e) => e.id === props.data.id).length - 1].timer : 0
                " />
            </div>
          </v-card-actions>
        </div>

        <v-avatar class="ma-2" size="100" rounded="0">
          <v-icon icon="mdi-washing-machine" size="90" start
            :color="isHaveHistory() ? 'purple-darken-3' : 'grey-darken-3'" />
        </v-avatar>
      </div>
    </v-card>
  </div>
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