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

      <div>
        <p class="p-m-2">
          {{ subtext }}
        </p>
      </div>

      <div class="p-m-4">

      <div class="p-m-2">
        <span>
          <InputText class="p-mw-20" v-on:keyup.enter="reset" v-model="user.email" placeholder="Email"/>
        </span>
      </div>

      <div class="p-m-2">
        <span>
          <Password class="p-mw-20" panelClass="register-password-feedback" v-on:keyup.enter="reset" :toggleMask=true v-model="user.password" placeholder="Password"/>
        </span>
      </div>

      <div class="p-m-2">
        <span class="">
            <Password class="p-mw-20" :toggleMask=true v-on:keyup.enter="reset" :feedback=false v-model="user.password_check" placeholder="Retype Password" />
        </span>
      </div>

      <div class="p-m-2" v-if="manual_token_input">
        <span class="">
            <InputText class="p-mw-20" :toggleMask=true v-on:keyup.enter="reset" :feedback=false v-model="user.token" placeholder="Token" />
        </span>
      </div>

      </div>

      <div>
        <Button class="p-m-1 p-button-sm" label="Reset" @click="reset"/>
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
  name: 'PasswordResetArea',
  components: {
  },
  data: function() {
    return {
      title: 'Password Reset',
      subtext: 'Enter your new password',
      subtext_progress: 'Resetting Password',
      loader: false,
      manual_token_input: true,
      user: {
        email: 'me@benbroad.com',
        password: '',
        password_check: '',
        token: '',
      }
    }
  },
  props: {
  },
  methods: {
    reset: async function() {

      // Validate email for length
      if (this.user.password.length < 1) {
        this.$toast.add({
          severity:'warn',
          summary: 'Missing Password',
          life: 3000,
          detail: 'Please enter a valid password',
          styleClass: 'compact-toast'
        });
        return;
      }

      if (this.user.password !== this.user.password_check) {
        this.$toast.add({
          severity:'warn',
          summary: 'Password Mismatch',
          detail: 'The passwords entered do not match',
          life: 3000,
          styleClass: 'compact-toast'
        });
        return;
      }

      // Show the loader
      this.loader = true;

      // Send reset request
      let result = await this.$store.dispatch('RESET_PASSWORD', this.user);
      if (result.status === true) {
        this.$toast.add({
          severity:'info',
          summary: 'Password Reset Completed',
          life: 3000,
          detail: 'Your password has been reset.',
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
