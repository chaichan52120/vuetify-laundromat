<template lang="pug">
v-app-bar.pa-2(color="primary" density="compact")
  template(#prepend)
    v-app-bar-nav-icon(@click="drawer = !drawer")
  v-app-bar-title Home

v-navigation-drawer.pt-5(v-model="drawer" temporary pa)
  v-list-item(prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg" :title="store.username")
  v-divider

  v-list(density="compact")
    v-list-item(:to="'/'" prepend-icon="mdi-home" title="Home" value="home" :active="route.name === 'Home'")
    v-list-item(:to="'/history'" prepend-icon="mdi-history" title="History" value="history" :active="route.name === 'History'")
    v-list-item(:to="'/add-cash'" prepend-icon="mdi-cash" title="Add Cash" value="add-cash" :active="route.name === 'AddCash'")
    v-list-item(:to="'/notification'" :prepend-icon="prependIcon" title="Notification" value="notification" :active="route.name === 'Notification'" :color="iconColor" :base-color="iconColor" @click="store.checkNoti()")
    v-divider
    v-list-item(href="/login" prepend-icon="mdi-logout" title="Logout" value="logout")
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from '@/stores/store'
import { useRoute } from "vue-router"

const store = useStore()
const route = useRoute()
const drawer = ref<boolean>(false)
const prependIcon = computed(() => store.notiActive ? 'mdi-bell-ring' : 'mdi-bell')
const iconColor = computed(() => store.notiActive ? 'red' : '')
</script>
