<template>
  <div>
    <h1 class="p-m-2">
      {{ title }}
    </h1>
    <p class="p-m-2">
      {{ subtext }}
    </p>
    <div class="p-m-6">
      <InputText class="p-mw-20" type="text" v-model="user.email" placeholder="Email" />
    </div>
    <div>
      <Button class="p-m-1 p-button-sm" label="Need to make an account" @click="navigateTo('register')"/>
      <Button class="p-m-1 p-button-text p-button-sm" label="Remembered Password" @click="navigateTo('login')"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotArea',
  components: {
  },
  data: function() {
    return {
      title: 'Recover Account',
      subtext: 'Enter the email associated with your account and an email will be sent to you',
      user: {
        email: '',
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
@import '@/assets/theme/main.scss';
h1 {color: #1586d5;}

</style>
