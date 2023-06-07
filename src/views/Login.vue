<template>
  <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" placeholder="test">
    <div class="d-flex flex-column  justify-center align-center text-white" style="min-height:100vh">
      <v-form :submit="onSubmit">
        <v-img height="200" src="@/assets/logo.svg" />

        <div class="text-body-2 font-weight-light mb-n1 text-center">Welcome to</div>

        <h1 class="text-h3 font-weight-bold v-pa-5">Laundromat</h1>

        <v-text-field v-model="username" label="Username" :rules="userRules" class="mt-5 text-left" variant="solo">
          <template #prepend-inner>
            <v-icon icon="mdi-account" color="primary" />
          </template>
        </v-text-field>

        <v-btn type="submit" class="mt-2" block color="primary">Login</v-btn>
      </v-form>
    </div>
  </v-parallax>
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
