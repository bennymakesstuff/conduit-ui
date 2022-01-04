<template>
  <div>

    <div class="default_title">
      <h1>{{ 'Hi, ' + user.firstname }}</h1>
    </div>

  </div>
</template>

<script>

export default {
  name: 'UserDashboard',
  components: {
  },
  data: function() {
    return {
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

</style>
