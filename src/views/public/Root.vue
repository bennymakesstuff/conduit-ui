<template>
  <div class="public-root">
    <Navigation />
    <RouterView></RouterView>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import Login from '@/components/Login.vue'
import Navigation from '@/views/public/Navigation.vue';

export default {
  name: 'UnauthenticatedRoot',
  components: {
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
            height: 100vh;
            background-color: #221d2d;}
</style>
