<template>
  <div>

    <div v-if="account_created" class="account-created">
      <h1 class="p-mb-6">
        Account Created
      </h1>
    </div>

    <div v-if="!account_created" class="create-account">
      <h1 class="p-mb-6">
        {{ title }}
      </h1>

      <div class="p-m-2 p-mt-4">
        <span class="">
            <InputText class="p-mw-20" type="text" v-model="user.given_name" placeholder="Given Name" />
        </span>
      </div>

      <div class="p-m-2">
        <span class="">
            <InputText class="p-mw-20" type="text" v-model="user.surname" placeholder="Surname" />
        </span>
      </div>

      <div class="p-m-2">
        <span class="">
            <InputText class="p-mw-20" type="text" v-model="user.email" placeholder="Email" />
        </span>
      </div>

      <div class="p-m-2">
        <span>
          <Password class="p-mw-20" panelClass="register-password-feedback" :toggleMask=true v-model="user.password" placeholder="Password"/>
        </span>
      </div>

      <div class="p-m-2">
        <span class="">
            <Password class="p-mw-20" :toggleMask=true :feedback=false v-model="user.password_check" placeholder="Retype Password" />
        </span>
      </div>

      <div class="p-mt-6">
        <Button class="p-m-1 p-button-sm" label="Register" @click="register"/>
        <Button class="p-m-1 p-button-text p-button-sm" label="Already have an account" @click="navigateTo('login')"/>
      </div>
    </div>

    <div id="somewhere">

    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterArea',
  components: {
  },
  data: function() {
    return {
      title: 'Create Account',
      account_created: false,
      user: {
        given_name: '',
        surname: '',
        email: '',
        password: '',
        password_check: ''
      }
    }
  },
  props: {
  },
  methods: {
    register: async function() {


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

      let result = await this.$store.dispatch('REGISTER', this.user);

      if (result === true) {
        this.account_created = true;
        this.$toast.add({
          severity:'success',
          summary: 'Account Created',
          life: 3000,
          styleClass: 'compact-toast'
        });
        setTimeout(this.navigateTo('login'), 2000);
      }
      else {
        this.$toast.add({
          severity:'error',
          summary: 'Account could not be created',
          detail: 'User may already exist',
          life: 3000,
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
.register-password-feedback {
  transform: translateY(3rem) !important;
  margin-top: 3rem !important;
}
</style>
