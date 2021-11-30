<template>
  <div>

    <div class="default_title">
      <h1>Welcome {{username}}</h1>
    </div>

    <div class="button-group">
      <button @click="navigateTo('user_profilesettings')">Settings</button>
      <button @click="navigateTo('user_utilities')">Utilities</button>
    </div>

    <router-view></router-view>

  </div>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
  name: 'UserRoot',
  components: {
    'router-view': RouterView
  },
  data: function() {
    return {
      username: this.$store.state.user.username || ''
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/assets/theme/main.scss';

</style>
