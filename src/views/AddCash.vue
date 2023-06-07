<template>
  <v-container>
    <v-responsive class="fill-height py-5 px-3">
      <h1 class="text-h3 v-pa-5">Payment</h1>

      <v-card class="mt-5 pa-2">
        <v-row>
          <v-col cols="12" sm="6" align-self="center" style="height: calc(100vh - 200px)" class="overflow-auto">
            <v-card class="elevation-5 rounded-lg" link @click="onAddCard"
              :style="{ 'opacity': cardForm.id === creditCardStore.count ? '1' : '0.75' }">
              <v-img class="align-center text-white" src="@/assets/credit-card-blank.png" cover>
                <div class="text-center">
                  <v-chip size="x-large" link>
                    <v-icon start icon="mdi-plus" />
                    Add Card
                  </v-chip>
                </div>
              </v-img>
            </v-card>
            <credit-card v-for="(item, index) in creditCardStore.credit_data" :data="item" :key="index"
              @submit="onChooseCard" :current-choose="cardForm.id" />
          </v-col>

          <v-divider class="d-sm-none" />

          <v-col cols="12" sm="6" :align-self="creditCardStore.credit_data.length > 0 ? 'center' : 'start'">
            <v-form :submit="onSubmit">
              <h1 class="text-h5">
                Payment Details
              </h1>
              <v-row class="mt-2">
                <v-col cols="12" class="py-0">
                  <v-text-field v-model="cardForm.fullName" :rules="defaultRules" label="Name on Card" class="mt-2" />
                </v-col>

                <v-col cols="12" class="py-0">
                  <v-text-field v-model="cardForm.cardNumber" :rules="cardNumberRules" label="Card Number" />
                </v-col>

                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field v-model="cardForm.validThrough" :rules="validThroughRules" label="Valid Through" />
                </v-col>

                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field v-model="cardForm.cvv" :rules="cvvRules" label="CVV" class="text-left" />
                </v-col>
              </v-row>

              <v-btn v-show="!isChooseCard" type="submit" class="mt-5" block color="primary">Add
                Card</v-btn>

              <v-btn v-show="isChooseCard" class="mt-5" block color="primary" @click="updateCard">Update Card</v-btn>

              <v-btn v-show="isChooseCard" class="mt-5" block color="red-darken-4" @click="deleteCard">Delete Card</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import { useCreditCard } from '@/stores/creditCard'
import CreditCard from '@/components/CreditCard.vue'
import { reactive, ref } from 'vue';
import type { CreditCardType } from "@/interface/main";

const creditCardStore = useCreditCard()
const isSubmit = ref<boolean>(true)
const isChooseCard = ref<boolean>(false)
const re_cardNumber = /^(?:\d{4})([ /.])\d{4}([ /.])\d{4}([ /.])\d{4}$/;
const re_fullName = /^(?:\d{2})([//.])\d{2}$/;
const re_cvv = /^(?:\d{3})$/;

const defaultRules = [(val: any[]) => {
  if (isSubmit.value) {
    if (val) {
      if (val.length < 6) {
        return 'This field must be at least 6 characters.'
      }
      return true;
    } else {
      return 'This field is requred.'
    }
  } else {
    return true;
  }
}]

const cardNumberRules = [(val: any[]) => {
  const valLength = val.toString().length
  if (valLength === 4 || valLength === 9 || valLength === 14) {
    cardForm.cardNumber += ' '
  }
  if (isSubmit.value) {
    if (val) {
      if (re_cardNumber.exec(val.toString())) {
        return true;
      } else {
        return 'The expected format is like #### #### #### ####'
      }
    } else {
      return 'This field is requred.'
    }
  } else {
    return true;
  }
}]

const validThroughRules = [(val: any[]) => {
  const valLength = val.toString().length
  if (valLength === 2) {
    cardForm.validThrough += '/'
  }
  if (isSubmit.value) {
    if (val) {
      if (re_fullName.exec(val.toString())) {
        return true;
      } else {
        return 'The expected format is like ##/##'
      }
    } else {
      return 'This field is requred.'
    }
  } else {
    return true;
  }
}]

const cvvRules = [(val: any[]) => {
  if (isSubmit.value) {
    if (val) {
      if (re_cvv.exec(val.toString())) {
        return true;
      } else {
        return 'The expected format is like ###'
      }
    } else {
      return 'This field is requred.'
    }
  } else {
    return true;
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
  isSubmit.value = true
  if (cardForm.cardNumber !== '' && cardForm.fullName !== '' && cardForm.validThrough !== '' && cardForm.cvv !== '') {
    creditCardStore.addCreditCard(cardForm)
    isChooseCard.value = true
  }
};

const onAddCard = () => {
  isChooseCard.value = false
  isSubmit.value = false
  cardForm.id = creditCardStore.count
  cardForm.fullName = ''
  cardForm.cardNumber = ''
  cardForm.validThrough = ''
  cardForm.cvv = ''
};

const onChooseCard = (data: CreditCardType) => {
  isSubmit.value = true
  isChooseCard.value = true
  cardForm.id = data.id
  cardForm.fullName = data.fullName
  cardForm.cardNumber = data.cardNumber
  cardForm.validThrough = data.validThrough
  cardForm.cvv = data.cvv
};

const updateCard = () => {
  isSubmit.value = true
  creditCardStore.updateCreditCard(cardForm)
}

const deleteCard = () => {
  creditCardStore.deleteCreditCard(cardForm)
  onAddCard()
}
</script>
