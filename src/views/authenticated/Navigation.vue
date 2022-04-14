<template>
    <div class="navigation p-shadow-4">

      <div class="logo-area">
        <div class="logo">Logo</div>
      </div>

      <NavMenuItem @click="navigateTo('dashboard')" link="users" title="Dashboard" icon="I">
        <i class="pi pi-th-large"></i>
      </NavMenuItem>
      <NavMenuItem @click="navigateTo('user')" link="users" :title="username" icon="I">
        <div class="user-icon">
          {{ userInitials }}
        </div>
      </NavMenuItem>
      <NavMenuItem v-if="checkPermission('user:view')" @click="navigateTo('users')" link="users" title="Users" icon="I">
        <i class="pi pi-users"></i>
      </NavMenuItem>
      <NavMenuItem v-if="checkPermission('roles:view')" @click="navigateTo('roles')" link="roles" title="Roles" icon="I">
        <i class="pi pi-briefcase"></i>
      </NavMenuItem>
      <NavMenuItem v-if="checkPermission('permissions:view')" @click="navigateTo('permissions')" link="permissions" title="Permissions" icon="I">
        <i class="pi pi-unlock"></i>
      </NavMenuItem>
      <NavMenuItem @click="navigateTo('app_settings')" link="app_settings" title="App Settings" icon="I" class="app-settings">
        <i class="pi pi-cog"></i>
      </NavMenuItem>
      <NavMenuItem @click="logout_user" title="Logout" icon="I">
        <i class="pi pi-sign-out rotate-180"></i>
      </NavMenuItem>
      <NavMenuItem @click="toggleWidth" :title="menuSizeText" icon="I">
        <i :class="[{'rotate-180': $store.getters.getNavigationSize}, 'menu-size-toggle', 'pi', 'pi-angle-left']"></i>
      </NavMenuItem>
      <NavMenuItem @click="toggleTheme" title="Toggle Theme" icon="I">
        T
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
    menuSizeText: function() {
      return this.$store.getters.getNavigationSize ? 'Expand Menu' : 'Compact Menu';
    },
    username: function() {
      if (this.$store.getters.getUser !== null) {
        let user = this.$store.getters.getUser;
        return user.firstname;
      }
      else {
        return 'Your Account';
      }
    },
    userInitials: function() {
      if (this.$store.getters.getUser !== null) {
        let user = this.$store.getters.getUser;
        return user.firstname[0] + user.lastname[0];
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
  color: var(--primary-text);
  text-align: left;
  height: 100vh;
  background: var(--menu-bg);
  transition: width 120ms ease;
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
    color: var(--logo-text-color);
  }
}

.menu-size-toggle {
  transition: transform 150ms ease;
}

.user-icon {
  border: 1px solid var(--user-icon-border);
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  background-color: var(--user-icon-bg);
  line-height: 1.9rem;
  color: var(--user-icon-text);
}
</style>
