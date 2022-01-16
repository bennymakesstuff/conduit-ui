<template>
    <div class="navigation p-shadow-4">

      <div class="logo-area">
        <div class="logo">Logo</div>
      </div>

      <NavMenuItem @click="navigateTo('dashboard')" link="users" title="Dashboard" icon="I">
        <i class="pi pi-th-large"></i>
      </NavMenuItem>
      <NavMenuItem @click="navigateTo('user')" link="users" :title="username" icon="I">
        <i class="pi pi-user"></i>
      </NavMenuItem><NavMenuItem @click="navigateTo('users')" link="users" title="Users" icon="I">
        <i class="pi pi-users"></i>
      </NavMenuItem>
      <NavMenuItem v-if="checkPermission('roles:view')" @click="navigateTo('roles')" link="roles" title="Roles" icon="I">
        <i class="pi pi-briefcase"></i>
      </NavMenuItem>
      <NavMenuItem v-if="checkPermission('permissions:view')" @click="navigateTo('permissions')" link="permissions" title="Permissions" icon="I">
        <i class="pi pi-unlock"></i>
      </NavMenuItem>
      <NavMenuItem @click="navigateTo('app_settings')" link="app_settings" title="App Settings" icon="I">
        <i class="pi pi-cog"></i>
      </NavMenuItem>
      <NavMenuItem @click="logout_user" title="Logout" icon="I">
        <i class="pi pi-user"></i>
      </NavMenuItem>
      <NavMenuItem @click="toggleWidth" title="" icon="I">
        <i :class="[{'rotate-180': $store.getters.getNavigationSize}, 'menu-size-toggle', 'pi', 'pi-angle-left']"></i>
      </NavMenuItem>
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
  mounted() {

  },
  computed: {
    username: function() {
      if (this.$store.getters.getUser !== null) {
        let user = this.$store.getters.getUser;
        return user.firstname;
      }
      else {
        return 'Your Account';
      }
    }
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
  transition: width 120ms ease;
  overflow: hidden;
  white-space: nowrap;

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

.menu-size-toggle {
  transition: transform 150ms ease;
}
</style>
