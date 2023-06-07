<template>
  <v-app-bar color="primary" density="compact" class="pa-2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Home</v-app-bar-title>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" permanent class="pt-5">
    <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg" :title="store.username"></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact">
      <v-list-item :to="'/'" prepend-icon="mdi-home" title="Home" value="home"
        :active="route.name === 'Home'"></v-list-item>

      <v-list-item :to="'/history'" prepend-icon="mdi-history" title="History" value="history"
        :active="route.name === 'History'"></v-list-item>

      <v-list-item :to="'/add-cash'" prepend-icon="mdi-cash" title="Add Cash" value="add-cash"
        :active="route.name === 'AddCash'"></v-list-item>

      <v-list-item :to="'/notification'" :prepend-icon="store.notiActive ? 'mdi-bell-ring' : 'mdi-bell'"
        title="Notification" value="notification" :active="route.name === 'Notification'"
        :color="store.notiActive ? 'red' : ''" :base-color="store.notiActive ? 'red' : ''"
        @click="store.checkNoti()"></v-list-item>

      <v-divider></v-divider>

      <v-list-item href="/login" prepend-icon="mdi-logout" title="Logout" value="logout"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '@/stores/store'
import { useRoute } from "vue-router"

const store = useStore()
const route = useRoute()
const drawer = ref<boolean>(true)
</script>
