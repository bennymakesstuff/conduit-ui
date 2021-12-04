<template>
  <router-view></router-view>
</template>

<script>
import { RouterView } from 'vue-router'

export default {
  name: 'App',
  components: {
    'router-view':RouterView
  },
  computed: {
  },
  mounted(){
  }
}
</script>

<style lang="scss">
@import '@/assets/theme/main.scss';

</style>
