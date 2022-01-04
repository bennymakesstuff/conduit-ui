<template>
  <div class="public-root">
    <Navigation />
    <RouterView></RouterView>

    <HomePage v-if="$route.name === 'home'"/>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Navigation from '@/views/public/Navigation.vue';
import HomePage from "@/views/public/Home.vue";

export default {
  name: 'UnauthenticatedRoot',
  components: {
    HomePage,
    Login,
    Navigation
  },
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme/main.scss';

.public-root {width: 100vw;}

.page-left {width: 40%;
            padding: 5rem;
            text-align: left;
            max-width: 30rem;
            height: 100vh;}
</style>
