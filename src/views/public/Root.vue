<template>
  <div class="public-root">
    <Navigation />
  </div>
</template>

<script>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
