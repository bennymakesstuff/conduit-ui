<template>
  <div class="auth-root">
    <Navigation :class="['navigation-pane', compact_navigation_class]"/>
    <div :class="['content-pane', compact_navigation_class]">
      <div class="inner-content-pane">
        <router-view></router-view>
      </div>
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
  computed: {
    compact_navigation_class: function(){
      return (this.$store.getters.getNavigationSize) ? 'compact' : '';
    }
  },
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme/main.scss';

$navigation_width: 10rem;
$navigation_width_compact: 4rem;

.auth-root {
  width: 100vw;
  min-height: 100vh;
  text-align: left;
  font-size: 0;
  background-color: #ffffff;
  position: relative;

  .content-pane {
    width: calc(100vw - #{$navigation_width});
    vertical-align: top;
    text-align: left;
    display: inline-block;
    min-height: 100vh;
    font-size: 1rem;
    background-color: $inner_content_pane_color;
    z-index: 9;
    height: 100vh;
    position: relative;

    > .inner-content-pane {
      height: 100vh;
      overflow: scroll;
      width: 100%;
      background-color: transparent;
      border-left: 1px solid #eaeaea;
    }
  }

  .content-pane.compact {
    width: calc(100vw - #{$navigation_width_compact});
  }

  .navigation-pane {
    vertical-align: top;
    font-size: 1rem;
    display: inline-block;
    width: $navigation_width;
    max-width: $navigation_width;
    box-shadow: 5px 5px 20px 5px rgba(0,0,0, 0.05);
    z-index: 10;
  }

  .navigation-pane.compact {
    width: $navigation_width_compact;
    max-width: $navigation_width_compact;
  }
}

</style>
