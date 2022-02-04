<template>
  <div class="nav-item">
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

  > div {
    display: inline-block;
    vertical-align: middle;
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
