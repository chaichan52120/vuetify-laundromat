<template lang="pug">
v-card.mt-2.elevation-5.rounded-lg(link @click="onClickCard" :style="{ 'opacity': currentChoose === data.id ? '1' : '0.75' }")
  v-img.text-white.align-end(src="@/assets/credit-card.png" width="100%")
    .custom-space
      v-card-text.text-h4.pb-2 {{ data.cardNumber }}
      v-row
        v-col(cols="8")
          v-card-text.text-h5.pr-0 {{ data.fullName }}
        v-col(cols="4")
          v-card-text.text-h5.pl-0 {{ data.validThrough }}
</template>

<script setup lang="ts">
const emit = defineEmits(['submit'])

const onClickCard = () => {
  emit('submit', props.data)
}

const props = defineProps({
  data: {
    type: Object,
    default: null
  },
  currentChoose: {
    type: Number,
    default: 0
  },
})
</script>

<style scoped>
.text-h4 {
  font-size: 6.5vw !important;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 0px;
}

.text-h5 {
  font-size: 4.5vw !important;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);

}

.custom-space {
  padding: 0px 10px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);

}

@media screen and (min-width: 600px) {
  .text-h4 {
    font-size: 3.5vw !important;
    margin-bottom: 15px;
  }

  .text-h5 {
    font-size: 2.5vw !important;
  }

  .custom-space {
    padding: 10px 20px;
  }
}

@media screen and (min-width: 1000px) {
  .text-h4 {
    font-size: 35px !important;
    margin-bottom: 20px;
  }

  .text-h5 {
    font-size: 25px !important;
  }

  .custom-space {
    padding: 10px 20px;
  }
}
</style>