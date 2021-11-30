<template>
  <AuthenticatedRoot/>
</template>

<script>
import UnauthenticatedRoot from '@/views/public/Root.vue'
import AuthenticatedRoot from '@/views/authenticated/Root.vue'
import { RouterView } from 'vue-router'

export default {
  name: 'App',
  components: {
    UnauthenticatedRoot,
    AuthenticatedRoot,
    'router-view':RouterView
  },
  mounted(){
    console.log("Store");
    console.log(this);
    console.log("Store");
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
</style>
