<template>
    <div class="navigation p-shadow-4">
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

<style lang="scss" scoped>
@import '@/assets/theme/main.scss';

.navigation {
  width: 100%;
  color: #333333;
  text-align: left;
  height: 100vh;
  background: #ffffff;
  }
</style>
