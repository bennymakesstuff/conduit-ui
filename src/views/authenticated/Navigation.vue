<template>
  <div class="public-root">
    <div class="navigation">

      <NavMenuItem @click="navigateTo('home')" title="Home"/>
      <NavMenuItem @click="navigateTo('user')" link="users" title="User"/>

    </div>
  </div>
</template>

<script>
import NavMenuItem from '@/components/NavMenuItem.vue'
export default {
  name: 'UnauthenticatedRoot',
  components: {
    NavMenuItem
  },
  props: {
    msg: String
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '@/assets/theme/main.scss';

.navigation {width: 5rem;
            text-align: left;
            max-width: 5rem;
            height: 100vh;
            box-shadow: 0px 2px 20px 2px rgba(0, 0, 0, 0.1);
            background-color: #2a2338;}
</style>
