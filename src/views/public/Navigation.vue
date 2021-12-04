<template>
  <div class="navigation">

    <button @click="login" class="login">Login</button>

  </div>
</template>

<script>
export default {
  name: 'UnauthenticatedNavigation',
  components: {
  },
  props: {
    msg: String
  },
  methods: {
    login: function() {
      this.navigateTo('login');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme/main.scss';

.navigation {
  width: 100vw;
  text-align: left;
  color: #ffffff;
  height: 4rem;
  box-shadow: 0px 2px 20px 2px rgba(0, 0, 0, 0.1);
  background-color: #2a2338;

  .login {
    float: right;
    margin-top: 0.5rem;
    margin-right: 1rem;
    height: 3rem;
  }
}
</style>
