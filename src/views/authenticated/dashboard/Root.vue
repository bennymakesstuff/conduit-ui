<template>
  <div class="inner-content">

    <div class="default_title">
      <h1>{{ 'Hi, ' + user.firstname }}</h1>
    </div>

    <div class="dash-grid">
      <div class="p-grid">
        <ActiveUsers />
        <ActiveRoles />
        <div class="p-col p-m-2">1</div>
        <div class="p-col p-m-2">1</div>
        <div class="p-col p-m-2">1</div>
        <div class="p-col p-m-2">1</div>
        <div class="p-col p-m-2">1</div>
        <div class="p-col p-m-2">1</div>
        <div class="p-col p-m-2">1</div>
      </div>

      <div class="p-grid">
        <div class="p-col-2 p-m-2 p-shadow-1">2</div>
        <div class="p-col-6 p-m-2">6</div>
        <div class="p-col-4 p-m-2">4</div>
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
