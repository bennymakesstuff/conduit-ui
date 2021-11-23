<template>
  <div class="public-root">
    <div class="page-left">
      <Login />
    </div>
    <div class="page-right">
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  name: 'UnauthenticatedRoot',
  components: {
    Login
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '@/assets/theme/main.scss';

.public-root {width: 100vw;}

.page-left {width: 40%;
            padding: 5rem;
            text-align: left;
            max-width: 30rem;
            height: 100vh;
            background-color: #221d2d;}
</style>
