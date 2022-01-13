<template>
  <div style="min-width: 30rem;">

    <!--<div v-if="$route.name===routeName" class="">-->
    <div class="">
      <div class="route-header">
        <div class="details">
          <h1 class="route-title">{{ pageTitle }}</h1>
          <p class="route-description">{{ route.description }}</p>
        </div>
        <div class="center"></div>
        <div class="controls">
          <Button label="Save" class="button-set p-m-1 p-button-sm" @click="saveUser"/>
          <Button label="Cancel" class="button-set p-m-1 p-button-sm" @click="close"/>
        </div>
      </div>
    </div>

    <div class="general-info p-m-2">
      <div class="left">
        <InputText class="p-m-1 p-col-12 p-inputtext-sm" v-model="new_user.firstname" placeholder="Given Name" />
        <InputText class="p-m-1 p-col-12 p-inputtext-sm" v-model="new_user.lastname" placeholder="Surname" />
      </div>
      <div class="right">
        <InputText class="p-m-1 p-col-12 p-inputtext-sm" v-model="new_user.email" placeholder="Email Address" />
        <InputText class="p-m-1 p-col-12 p-inputtext-sm" v-model="new_user.phone" placeholder="Phone" />
      </div>
    </div>

    <div class="general-info p-m-2">
      <div class="left">
        <InputText class="p-m-1 p-col-12 p-inputtext-sm" v-model="new_user.password" placeholder="Password" />
      </div>
      <div class="right">

      </div>
    </div>


  </div>
</template>

<script>
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import {$axios as $http} from "@/axios";

export default {
  name: 'UsersCreate',
  data: function() {
    return {
      route: {
        name: 'user-create',
        createName: 'user-create',
        editName: 'user-edit',
        title: 'New User',
        description: 'Create a new user',
      },
      new_user: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: ''
      },
    }
  },
  computed: {
    pageTitle: function() {
      if (this.$route.name === this.route.createName) {
        return 'New User';
      }
      if (this.$route.name === this.route.editName) {
        return 'Edit User'
      }
      return 'Issue Found'
    }
  },
  methods: {
    saveUser: async function() {
      try {
        let response = await $http.post('http://localhost:8000/api/v1/users/create', {
          'email': this.new_user.email,
          'firstname': this.new_user.firstname,
          'lastname': this.new_user.lastname,
          'password': this.new_user.password
        });
        let data = response.data;

        // Send request to create new user
        if (data.status === false) {
          console.log('%cCould not create new user', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
        }

        this.navigateTo('users');
      }
      catch (error) {
        console.log('%cCould not create new user', "color:red");
        console.log(error);
      }
    },
    close: function() {
      this.navigateTo('users');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme/main.scss';

.button-set {
  display: inline-block;
}

.permission-table {
  margin-bottom: 2rem;
}

.general-info {
  display: flex;
  margin: 0;

  > div {
    flex: 1;
    padding: 1rem;
  }

  > div:first-child {
    padding-left: 0;
  }

  > div:last-child {
    padding-right: 0;
  }
}
</style>
