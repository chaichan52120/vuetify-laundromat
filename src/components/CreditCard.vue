<template lang="pug">
v-card.mt-2.elevation-5.rounded-lg(link @click="onClickCard" :class="cardStatus")
  v-img.text-white.align-end(src="@/assets/credit-card.png" width="100%")
    .custom-space
      v-card-text.text-card-lg.pb-2 {{ data.cardNumber }}
      v-row
        v-col(cols="8")
          v-card-text.text-card-md.pr-0 {{ data.fullName }}
        v-col(cols="4")
          v-card-text.text-card-md.pl-0 {{ data.validThrough }}
</template>

<script setup lang="ts">
import { computed } from 'vue'

const cardStatus = computed(() => props.currentChoose === props.data.id ? 'active' : 'non-active')

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
.active {
  opacity: 1;
}

.non-active {
  opacity: 0.75;
}

.text-card-lg {
  font-size: 6.5vw;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 0px;
}

.text-card-md {
  font-size: 4.5vw;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);

}

.custom-space {
  padding: 0px 10px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);

}

@media screen and (min-width: 600px) {
  .text-card-lg {
    font-size: 3.5vw;
    margin-bottom: 15px;
  }

  .text-card-md {
    font-size: 2.5vw;
  }

  .custom-space {
    padding: 10px 20px;
  }
}

@media screen and (min-width: 1000px) {
  .text-card-lg {
    font-size: 35px;
    margin-bottom: 20px;
  }

  .text-card-md {
    font-size: 25px;
  }

  .custom-space {
    padding: 10px 20px;
  }
}
</style>