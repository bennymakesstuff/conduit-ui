<template>
  <div>
    <h1 class="p-m-2">
      {{ title }}
    </h1>

    <div v-if="loader">
      <p class="p-m-2">
        {{ subtext_progress }}
      </p>
      <ProgressSpinner />
    </div>
    <div v-if="!loader">
      <p class="p-m-2">
        {{ subtext }}
      </p>
      <div class="p-m-6">
        <InputText class="p-mw-20" v-on:keyup.enter="recover" type="text" v-model="user.email" placeholder="Email" />
      </div>
      <div>
        <Button class="p-m-1 p-button-sm" label="Send Password Reset" @click="recover"/>
        <Button class="p-m-1 p-button-text p-button-sm" label="Remembered Password" @click="navigateTo('login')"/>
      </div>
      <div>
        <Button class="p-m-1 p-button-text p-button-sm" label="Create a new account" @click="navigateTo('register')"/>
      </div>
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
      subtext_progress: 'Requesting account recovery email',
      loader: false,
      user: {
        email: '',
      }
    }
  },
  props: {
  },
  methods: {
    recover: async function() {

      // Validate email for length
      if (this.user.email.length < 1) {
        this.$toast.add({
          severity:'warn',
          summary: 'Missing Email Address',
          life: 3000,
          detail: 'Please enter a valid email address to reset password',
          styleClass: 'compact-toast'
        });
        return;
      }

      // Show the loader
      this.loader = true;

      // Send reset request
      let result = await this.$store.dispatch('REQUEST_PASSWORD_RESET', this.user);
      if (result.status === true) {
        this.$toast.add({
          severity:'info',
          summary: 'Password Reset Sent',
          life: 3000,
          detail: 'A password reset link has been sent to this email address if an account exists.',
          styleClass: 'compact-toast'
        });
        this.loader = false;
        this.navigateTo('login');
      }
      else {
        this.loader = false;
        this.$toast.add({
          severity:'error',
          summary: 'Password Reset Failed',
          life: 3000,
          detail: 'A password reset could not be sent at this time. Please try again later.',
          styleClass: 'compact-toast'
        });
      }

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme/main.scss';
h1 {color: #1586d5;}

</style>
