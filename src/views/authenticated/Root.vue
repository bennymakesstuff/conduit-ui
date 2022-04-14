<template>
  <div class="auth-root">
    <Navigation :class="['navigation-pane', compact_navigation_class]"/>
    <div :class="['content-pane', compact_navigation_class]">
      <div v-show="showLoader" class="loader-overlay">
        <div class="loader-inner">
          <div class="loader-box">
            <div class="loader"></div>
          </div>
          <div v-show="showLoaderText" class="loader-text">Loading</div>
        </div>
      </div>
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
    showLoader: function () {
      return this.$store.getters.getLoaderState;
    },
    showLoaderText: function () {
      return this.$store.getters.getLoaderTextState;
    },
    compact_navigation_class: function () {
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

.loader-overlay {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-color);
  display: flex;
  position: absolute;
  z-index: 1000;

  > .loader-inner {
    min-width: 5rem;
    min-height: 5rem;
    background-color: transparent;
    margin: auto;

    > .loader-box {
      height: 4rem;
      width: 4rem;
      background-color: transparent;
      margin: auto;
    }

    > .loader-text {
      font-size: 2rem;
      color: var(--loader-color);
      width: 100%;
      text-align: center;
    }
  }
}

.auth-root {
  width: 100vw;
  min-height: 100vh;
  text-align: left;
  font-size: 0;
  background-color: var(--bg-color);
  position: relative;

  .content-pane {
    width: calc(100vw - #{$navigation_width});
    vertical-align: top;
    text-align: left;
    display: inline-block;
    min-height: 100vh;
    font-size: 1rem;
    background-color: var(--bg-color);
    z-index: 9;
    height: 100vh;
    position: relative;

    > .inner-content-pane {
      height: 100vh;
      overflow: scroll;
      width: 100%;
      background-color: transparent;
      border-left: 1px solid var(--menu-border);
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
