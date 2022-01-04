<template>
  <div>
    <h1 class="p-mb-6">
      {{ title }}
    </h1>

    <InputText class="p-m-2 p-mw-20" type="text" v-model="user.email" placeholder="Email" />
    <Password class="p-m-2 p-mw-20" type="text" v-model="user.password" placeholder="Password" />

    <div class="p-mt-6">
      <Button class="p-m-1 p-button-sm" label="Login" @click="login"/>
      <Button class="p-m-1 p-button-text p-button-sm" label="Forgot Password" @click="navigateTo('recover_account')"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginArea',
  components: {
  },
  data: function() {
    return {
      title: 'Login',
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
      let result = this.$store.dispatch('LOGIN_USER', this.user);

      if (this.user.email.length < 1 || this.user.password.length < 1) {
        this.$toast.add({severity:'warn', summary: 'Further Detail Required', detail: 'Fill out all required fields to login',  life: 3000, styleClass: 'compact-toast'});
        return;
      }

      if (result === true) {
        this.$toast.add({severity:'success', summary: 'Logged In',  life: 3000, styleClass: 'compact-toast'});
      }
      else {
        this.$toast.add({severity:'error', summary: 'Incorrect Details', life: 3000, detail: 'Username or Password was incorrect', styleClass: 'compact-toast'});
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme/main.scss';
h1 {color: #1586d5;}
</style>
