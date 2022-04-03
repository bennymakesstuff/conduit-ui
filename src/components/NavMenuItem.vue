<template>
  <div class="nav-item">
    <div class="nav-tooltip">
      <div class="triangle"></div>
      <div class="text">{{ title }}</div>
    </div>
    <div :class="[{'narrow-menu': $store.getters.getNavigationSize},'icon']">
      <slot></slot>
    </div>
    <div v-show="!$store.getters.getNavigationSize" class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'NavMenuItem',
  props: {
    title: {
      default: 'No Title',
      type: String
    },
    icon: {
      default: 'I',
      type: String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.nav-item:hover > .nav-tooltip {
  display: block;
}

.nav-item {
  width: 100%;
  height: 3.5rem;
  line-height: 3.5rem;
  text-align: center;
  border-bottom: 1px solid var(--menu-border);
  cursor: pointer;
  color: var(--navitem-text);
  font-weight: 500;
  font-size: 0.9rem;
  margin: 0;
  text-align: left;
  position: relative;

  > div {
    display: inline-block;
    vertical-align: middle;
  }

  .nav-tooltip {
    width: auto;
    height: 2rem;
    padding: 0.25rem 0.5rem;
    display: none;
    position: absolute;
    left: calc(100% + 1rem);
    top: calc(50% - 0.75rem);
    z-index: 50;
    line-height: 1.5rem;
    background: var(--menu-bg);
    box-shadow: 1px 1px 3px rgba(87, 87, 87, 0.74);

    > .triangle {
      width: 1.5rem;
      height: 1.5rem;
      transform: rotate(-45deg);
      background: var(--menu-bg);
      position: absolute;
      top: 0.25rem;
      left: -0.75rem;
      z-index: 49;
      border-radius: 0.25rem;
    }

    > .text {
      position: relative;
      z-index: 50;
      color: var(--navitem-text);
      margin-left: -0.25rem;
    }
  }

  > .icon.narrow-menu {
    margin-left: 1rem;
  }

  > .icon {font-size: 1rem;
          width: 2rem;
          height: 2rem;
          margin-right: 0.75rem;
          margin-left: 0.5rem;
          line-height: 2rem;
          text-align: center;
          transition: margin-left 100ms ease;
          color: var(--navitem-icon);

    > i {
      vertical-align: top;
      margin-top: 0.4rem;
    }
  }
  > .text {
    transition: display 100ms ease;
  }
}

.nav-item:hover {background-color: rgba(0,0,0,0.05);}
</style>
