<template>
  <div class="inner-content">

      <div class="route-header">
        <div class="details">
          <h1 class="route-title">{{ 'Hi, ' + user.firstname }}</h1>
          <p class="route-description"></p>
        </div>
        <div class="center"></div>
        <div class="controls">
          <div>
            <Button label="Create Role" @click="navigateTo('role-create')" class="p-button-sm" />
          </div>
        </div>
      </div>

    <div class="dash-grid">
      <div class="p-grid">
        <ActiveUsers />
        <ActiveRoles />
      </div>
    </div>

  </div>
</template>

<script>
import ActiveUsers from '@/views/authenticated/dashboard/stats/StatActiveUsers.vue';
import ActiveRoles from '@/views/authenticated/dashboard/stats/StatActiveRoles.vue';

export default {
  name: 'UserDashboard',
  components: {
    ActiveUsers,
    ActiveRoles
  },
  data: function() {
    return {
      route: {
        name: 'dashboard',
        title: 'Dashboard',
        description: null,
      },
      default_user: {
        username: '',
        firstname: '',
        lastname: '',
      },
      user: this.$store.getters.getUser || this.default_user,
    }
  },
  mounted() {
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/theme/main.scss';

.inner-content {
  padding: 1rem;
}

.dash-grid > div > div {
  background-color: #ffffff;
  //border: 1px solid #d9d9d9;
  border-radius: 0.25rem;
  box-shadow: 1px 0px 2px 1px rgba(187, 187, 187, 0.23);
}

</style>
