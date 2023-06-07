import { defineStore } from "pinia";
import { ref } from "vue";
import type { CreditCardType } from "@/interface/main";

export const useCreditCard = defineStore("credit", () => {
  let count = ref<number>(0);
  const selected = ref<number | null>();
  const credit_data = ref<CreditCardType[]>([
    {
      id: 999,
      fullName: "Chaichan Tamkoo",
      cardNumber: "1234 5678 1234 5678",
      validThrough: "05/23",
      cvv: "901",
    },
  ]);
  function addCreditCard(data: CreditCardType) {
    credit_data.value.push({
      id: count.value,
      fullName: data.fullName,
      cardNumber: data.cardNumber,
      validThrough: data.validThrough,
      cvv: data.cvv,
    });
    count.value++;
  }
  function updateCreditCard(data: CreditCardType) {
    const dataArr = credit_data.value.filter((x) => x.id !== data.id);
    credit_data.value = dataArr;
    credit_data.value.push({
      id: data.id,
      fullName: data.fullName,
      cardNumber: data.cardNumber,
      validThrough: data.validThrough,
      cvv: data.cvv,
    });
    credit_data.value.sort((a, b) => (a.id < b.id ? -1 : 1));
  }
  function deleteCreditCard(data: CreditCardType) {
    const dataArr = credit_data.value.filter((x) => x.id !== data.id);
    credit_data.value = dataArr;
    selected.value = null;
  }
  return {
    credit_data,
    count,
    selected,
    addCreditCard,
    updateCreditCard,
    deleteCreditCard,
  };
});
