<template>
  <div>
    <h1>
      {{ title }}
    </h1>

    <div class="p-m-2">
      <span class="p-input-icon-left">
          <i class="pi pi-user" />
          <InputText type="text" v-model="user.given_name" placeholder="Given Name" />
      </span>
    </div>

    <div class="p-m-2">
      <span class="p-input-icon-left">
          <i class="pi pi-user" />
          <InputText type="text" v-model="user.surname" placeholder="Surname" />
      </span>
    </div>

    <div class="p-m-2">
      <span class="p-input-icon-left">
          <i class="pi pi-user" />
          <InputText type="text" v-model="user.password" placeholder="Email" />
      </span>
    </div>

    <div class="p-m-2">
      <span class="p-input-icon-left">
          <i class="pi pi-email" />
          <InputText type="text" v-model="user.password" placeholder="Password" />
      </span>
    </div>

    <div>
      <Button class="p-m-1 p-button-sm" label="Register" @click="register"/>
      <Button class="p-m-1 p-button-text p-button-sm" label="Already have an account" @click="navigateTo('login')"/>
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
      user: {
        given_name: '',
        surname: '',
        email: '',
        password: ''
      }
    }
  },
  props: {
  },
  methods: {
    register: function() {
      this.$store.dispatch('REGISTER', this.user);
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {color: #1586d5;}
</style>
