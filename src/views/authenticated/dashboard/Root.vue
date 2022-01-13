<template>
  <div class="inner-content">

    <div class="default_title">
      <h1>{{ 'Hi, ' + user.firstname }}</h1>
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
      stats: {
        users: 12
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
