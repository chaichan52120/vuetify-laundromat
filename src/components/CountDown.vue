<template>
  {{ hour() + ':' + min() + ':' + sec() }}
</template>

<script setup lang="ts">
const hour = () => {
  let h = props.time_sec / 3600
  h = parseInt(`${h}`)
  const digiH = h.toString()
  if (digiH.length < 2) {
    return '0' + digiH
  } else {
    return digiH
  }
}

const min = () => {
  let m = props.time_sec / 60 % 60
  m = parseInt(`${m}`)
  const digiM = m.toString()
  if (digiM.length < 2) {
    return '0' + digiM
  } else {
    return digiM
  }
}

const sec = () => {
  let s = props.time_sec % 60
  s = parseInt(`${s}`)
  const digiS = s.toString()
  if (digiS.length < 2) {
    return '0' + digiS
  } else {
    return digiS
  }
}

const props = defineProps({
  time_sec: {
    type: Number,
    default: ''
  },
})
</script>