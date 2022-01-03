<template>
  <div class="navigation">

    <Button class="p-button-text p-m-3 login" label="Login" @click="login" />
    <Button class="p-button-text p-m-3 login" label="Register" @click="register" />

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
    },
    register: function() {
      this.navigateTo('register');
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

  .login {
    float: right;
    margin-top: 0.5rem;
    margin-right: 1rem;
  }
}
</style>
