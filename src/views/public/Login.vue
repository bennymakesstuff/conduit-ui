<template>
  <div>

    <LoginArea />

  </div>
</template>

<script>
import LoginArea from '@/components/Login.vue';
export default {
  name: 'LoginPage',
  components: {
    LoginArea
  },
  props: {
  },
  methods: {
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
