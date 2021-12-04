<template>
  <div>
    <h1>Login to Application</h1>
    <div>
      <input type="text" v-model="user.username" placeholder="username" />
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
export default {
  name: 'LoginArea',
  data: function() {
    return {
      user: {
        username: '',
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
