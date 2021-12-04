<template>
    <div class="navigation">
      <NavMenuItem @click="navigateTo('dashboard')" link="users" title="Dashboard"/>
      <NavMenuItem @click="navigateTo('user')" link="users" title="User"/>
      <NavMenuItem @click="logout_user" title="Logout"/>
  </div>
</template>

<script>
import NavMenuItem from '@/components/NavMenuItem.vue'
export default {
  name: 'AuthenticatedNavigation',
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
<style lang="scss" scoped>
@import '@/assets/theme/main.scss';

.navigation {width: 100%;
            text-align: left;
            height: 100vh;
            box-shadow: 0px 2px 20px 2px rgba(0, 0, 0, 0.1);
            background-color: $main_purple;}
</style>
