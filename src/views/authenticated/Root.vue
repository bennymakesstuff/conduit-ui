<template>
  <div class="auth-root">
    <Navigation class="navigation-pane"/>
    <div class="content-pane">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from '@/views/authenticated/Navigation.vue';

export default {
  name: 'AuthRoot',
  components: {
    Navigation,
  },
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme/main.scss';

$navigation_width: 7rem;

.auth-root {
  width: 100vw;
  min-height: 100vh;
  text-align: left;
  font-size: 0;
  background-color: yellow;
  position: relative;

  .content-pane {
    width: calc(100vw - #{$navigation_width});
    vertical-align: top;
    text-align: left;
    display: inline-block;
    background-color: rgb(238, 238, 238);
    min-height: 100vh;
    font-size: 1rem;
    z-index: 9;
  }

  .navigation-pane {
    vertical-align: top;
    font-size: 1rem;
    display: inline-block;
    max-width: $navigation_width;
    box-shadow: 5px 5px 20px 5px #333333;
    z-index: 10;
  }
}

</style>
