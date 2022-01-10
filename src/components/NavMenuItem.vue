<template>
  <div class="nav-item">
    <div class="icon">
      <slot></slot>
    </div>
    <div v-if="!$store.getters.getNavigationSize" class="title">{{ title }}</div>
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
  border-bottom: 1px solid #eeeeee;
  cursor: pointer;
  color: rgb(21, 96, 173);
  font-weight: 500;
  font-size: 0.9rem;
  margin: 0;

  > div {
    display: inline-block;
    vertical-align: middle;
  }

  > .icon {font-size: 1rem; width: 1rem; height: 2rem; margin-right: 0.75rem; margin-left: 0.5rem;
    > i {
      vertical-align: top;
      margin-top: 0.4rem;
    }
  }
  > .text {}
}

.nav-item:hover {background-color: rgba(0,0,0,0.05);}
</style>
