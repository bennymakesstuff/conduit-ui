<template>
  <div class="register-page">

    <RegisterArea class="register-area p-as-center"/>

  </div>
</template>

<script>
import RegisterArea from '@/components/Register.vue';
export default {
  name: 'RegisterPage',
  components: {
    RegisterArea
  },
  props: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme/main.scss';

.register-page {
  display: flex;
  width: 100%;
  height: calc(100vh - 4rem);

  > .register-area {
    flex: 1;
    margin-top: -5rem;
  }
}

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
    height: 3rem;
  }
}
</style>
