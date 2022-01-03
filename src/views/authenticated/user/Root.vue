<template>
  <div>

    <div class="default_title">
      <h1>{{user.username}}</h1>
    </div>

    <div class="slider-container">
      <Slider />
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
import Slider from '@/components/ui/Slider.vue';

export default {
  name: 'UserRoot',
  components: {
    'router-view': RouterView,
    Slider
  },
  data: function() {
    return {
      default_user: {
        username: '',
        given_name: '',
        surname: '',
      },
      user: this.$store.getters.getUser || default_user
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme/main.scss';

.slider-container {
  width: 20rem;
  height: 4rem;
  margin-left: 5rem;
  background-color: yellow;
}
</style>
