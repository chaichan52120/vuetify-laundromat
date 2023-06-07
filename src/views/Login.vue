<template lang="pug">
v-parallax(src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" placeholder="test")
  .d-flex.flex-column.justify-center.align-center.text-white(style="min-height:100vh")
    v-form(:submit="onSubmit")
      v-img(height="200" src="@/assets/logo.svg")
      .text-body-2.font-weight-light.mb-n1.text-center Welcome to
      h1.text-h3.font-weight-bold.v-pa-5 Laundromat
      v-text-field.mt-5.text-left(v-model="username" label="Username" :rules="userRules" variant="solo")
        template(#prepend-inner)
          v-icon(icon="mdi-account" color="primary")
      v-btn.mt-2(type="submit" block color="primary") Login
</template>

<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue';
import { useStore } from '@/stores/store'

const username = ref<string>('')
const userRules = [(val: any[]) => { if (val) return true; return 'Username is requred.' }]
const store = useStore()

const onSubmit = () => {
  if (username.value) {
    store.username = username.value
    router.push('/');
  }
};
</script>
