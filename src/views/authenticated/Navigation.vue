<template>
    <div class="navigation p-shadow-4">

      <div class="logo-area">
        <div class="logo">Logo</div>
      </div>

      <NavMenuItem @click="navigateTo('dashboard')" link="users" title="Dashboard" icon="I">
        <i class="pi pi-check"></i>
      </NavMenuItem>
      <NavMenuItem @click="navigateTo('user')" link="users" title="User" icon="I"/>
      <NavMenuItem @click="navigateTo('roles')" link="roles" title="Roles" icon="I"/>
      <NavMenuItem @click="navigateTo('permissions')" link="permissions" title="Permissions" icon="I"/>
      <NavMenuItem @click="logout_user" title="Logout" icon="I"/>
      <NavMenuItem @click="toggleWidth" title="W" icon="I"/>
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
    toggleWidth: function() {
      this.$store.dispatch('TOGGLE_NAVIGATION_SIZE');
    }
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


  > .logo-area {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    text-align: center;
    width: 100%;
    min-height: 3rem;
    line-height: 3rem;
    font-size: 1.5rem;
  }
}
</style>
