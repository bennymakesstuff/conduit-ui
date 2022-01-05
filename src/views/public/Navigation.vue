<template>
  <div class="navigation">

    <div class="nav-buttons-group">
      <Button class="p-button-text p-m-2 p-mt-3 nav-button" label="Test Login" @click="testLogin" />
      <Button class="p-button-text p-m-2 p-mt-3 nav-button" label="Reset" @click="navigateTo('password_reset')" />
      <Button class="p-button-text p-m-2 p-mt-3 nav-button" label="Home" @click="navigateTo('home')" />
      <Button class="p-button-text p-m-2 p-mt-3 nav-button" label="Register" @click="navigateTo('register')" />
      <Button class="p-button-text p-m-2 p-mt-3 nav-button" label="Login" @click="navigateTo('login')" />
    </div>

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
    testLogin: function() {
      this.$store.dispatch('TEST_LOGIN');
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
  height: 3.75rem;
  box-shadow: 0px 2px 20px 2px rgba(0, 0, 0, 0.1);

  .nav-buttons-group {
    float: right;

    .nav-button {
      margin-top: 0.5rem;
      margin-right: 1rem;
      font-size: 0.85rem;
    }
  }
}
</style>
