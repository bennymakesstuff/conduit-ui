<template>
  <div>
    <h1>
      <IconBase icon-name="login" icon-color="#ffffff">
        <IconLogin />
      </IconBase>
      Login to Application
    </h1>
    <div>
      <input type="text" v-model="user.email" placeholder="email" />
    </div>
    <div>
      <input type="text" v-model="user.password" placeholder="password" />
    </div>
    <div>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase.vue';
import IconLogin from '@/components/icons/IconLogin.vue';

export default {
  name: 'LoginArea',
  components: {
    IconBase,
    IconLogin
  },
  data: function() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  props: {
  },
  methods: {
    login: function() {
      this.$store.dispatch('LOGIN_USER', this.user);
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {color: #ffffff;}
</style>
