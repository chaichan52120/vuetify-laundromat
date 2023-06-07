<template lang="pug">
span {{ hour(time.getHours()) + ':' + min(time.getMinutes()) + ':' + sec(time.getSeconds()) }}
</template>

<script setup lang="ts">
const hour = (h: number) => {
  const digiH = h.toString()
  if (digiH.length < 2) {
    return '0' + digiH
  } else {
    return digiH
  }
}

const min = (m: number) => {
  const digiM = m.toString()
  if (digiM.length < 2) {
    return '0' + digiM
  } else {
    return digiM
  }
}

const sec = (s: number) => {
  const digiS = s.toString()
  if (digiS.length < 2) {
    return '0' + digiS
  } else {
    return digiS
  }
}

defineProps({
  time: {
    type: Date,
    default: ''
  },
})
</script>