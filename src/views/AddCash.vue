<template lang="pug">
v-container
  v-responsive.fill-height.py-5.px-3
    h1.text-h3 Payment
    v-card.mt-5.pa-2
      v-row
        v-col(cols="12" sm="6" align-self="center" style="height: calc(100vh - 200px)" class="overflow-auto")
          v-card.elevation-5.rounded-lg(link @click="onAddCard" :style="{ 'opacity': cardForm.id === creditCardStore.count ? '1' : '0.75' }")
            v-img.align-center.text-white(src="@/assets/credit-card-blank.png" cover)
              .text-center
                v-chip(size="x-large" link)
                  v-icon(start icon="mdi-plus")
                  span Add Card
          credit-card(v-for="(item, index) in creditCardStore.credit_data" :data="item" :key="index" @submit="onChooseCard" :current-choose="cardForm.id")
        v-divider.d-sm-none
        v-col(cols="12" sm="6" :align-self="creditCardStore.credit_data.length > 0 ? 'center' : 'start'")
          v-form(ref="myForm" :submit="onSubmit")
            h1.text-h5 Payment Details
            v-row.mt-2
              v-col.py-0(cols="12")
                v-text-field.mt-2(v-model="cardForm.fullName" :rules="defaultRules" label="Name on Card")
              v-col.py-0(cols="12")
                v-text-field(v-model="cardForm.cardNumber" :rules="cardNumberRules" label="Card Number")
              v-col.py-0(cols="12" sm="6")
                v-text-field(v-model="cardForm.validThrough" :rules="validThroughRules" label="Valid Through")
              v-col.py-0(cols="12" sm="6")
                v-text-field(v-model="cardForm.cvv" :rules="cvvRules" label="CVV" class="text-left")
            v-btn.mt-5(v-show="!isChooseCard" type="submit" block color="primary") Add Card
            v-btn.mt-5(v-show="isChooseCard" block color="primary" @click="updateCard") Update Card
            v-btn.mt-5(v-show="isChooseCard" block color="red-darken-4" @click="deleteCard") Delete Card
</template>

<script lang="ts" setup>
import { useCreditCard } from '@/stores/creditCard'
import CreditCard from '@/components/CreditCard.vue'
import { reactive, ref } from 'vue';
import type { CreditCardType } from "@/interface/main";

const creditCardStore = useCreditCard()
const myForm = ref<any>()
const isChooseCard = ref<boolean>(false)
const re_cardNumber = /^(?:\d{4})([ /.])\d{4}([ /.])\d{4}([ /.])\d{4}$/;
const re_fullName = /^(?:\d{2})([//.])\d{2}$/;
const re_cvv = /^(?:\d{3})$/;

const defaultRules = [(val: any[]) => {
  if (val) {
    if (val.length < 6) {
      return 'This field must be at least 6 characters.'
    }
    return true;
  } else {
    return 'This field is requred.'
  }
}]

const cardNumberRules = [(val: any[]) => {
  const valLength = val.toString().length
  if (valLength === 4 || valLength === 9 || valLength === 14) {
    cardForm.cardNumber += ' '
  }
  if (val) {
    if (re_cardNumber.exec(val.toString())) {
      return true;
    } else {
      return 'The expected format is like #### #### #### ####'
    }
  } else {
    return 'This field is requred.'
  }
}]

const validThroughRules = [(val: any[]) => {
  const valLength = val.toString().length
  if (valLength === 2) {
    cardForm.validThrough += '/'
  }
  if (val) {
    if (re_fullName.exec(val.toString())) {
      return true;
    } else {
      return 'The expected format is like ##/##'
    }
  } else {
    return 'This field is requred.'
  }
}]

const cvvRules = [(val: any[]) => {
  if (val) {
    if (re_cvv.exec(val.toString())) {
      return true;
    } else {
      return 'The expected format is like ###'
    }
  } else {
    return 'This field is requred.'
  }
}]

const cardForm = reactive({
  id: 0,
  fullName: '',
  cardNumber: '',
  validThrough: '',
  cvv: '',
})

const onSubmit = () => {
  if (cardForm.cardNumber !== '' && cardForm.fullName !== '' && cardForm.validThrough !== '' && cardForm.cvv !== '') {
    creditCardStore.addCreditCard(cardForm)
    isChooseCard.value = true
  }
};

const onAddCard = () => {
  myForm.value.reset()
  isChooseCard.value = false
  cardForm.id = creditCardStore.count
  cardForm.fullName = ''
  cardForm.cardNumber = ''
  cardForm.validThrough = ''
  cardForm.cvv = ''
};

const onChooseCard = (data: CreditCardType) => {
  isChooseCard.value = true
  cardForm.id = data.id
  cardForm.fullName = data.fullName
  cardForm.cardNumber = data.cardNumber
  cardForm.validThrough = data.validThrough
  cardForm.cvv = data.cvv
};

const updateCard = () => {
  creditCardStore.updateCreditCard(cardForm)
}

const deleteCard = () => {
  creditCardStore.deleteCreditCard(cardForm)
  onAddCard()
}
</script>
