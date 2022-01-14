<template>
  <div style="min-width: 30rem;">

    <div class="">
      <div class="route-header">
        <div class="details">
          <h1 class="route-title">{{ pageTitle }}</h1>
          <p class="route-description">{{ route.description }}</p>
          <p class="route-description">{{ $route.params.userId }}</p>
        </div>
        <div class="center"></div>
        <div class="controls">
          <Button v-if="viewEdit" :label="editModeButton" class="button-set p-m-1 p-button-sm" @click="toggleEdit"/>
          <Button v-if="!viewEdit" label="Create" class="button-set p-m-1 p-button-sm" @click="saveUser"/>
          <Button label="Back to List" class="button-set p-m-1 p-button-sm" @click="close"/>
        </div>
      </div>

      <div class="p-grid">
        <div class="general-info p-col-12 p-p-0 grid-item">
          <div class="grid-item-title">
            General Details
          </div>
          <div class="grid-item-inner">
            <div class="left">
              <InputText class="p-m-1 p-col-12 p-inputtext-sm" :disabled="editMode" v-model="user.firstname" placeholder="Given Name" />
              <InputText class="p-m-1 p-col-12 p-inputtext-sm" :disabled="editMode" v-model="user.lastname" placeholder="Surname" />
            </div>
            <div class="right">
              <InputText class="p-m-1 p-col-12 p-inputtext-sm" :disabled="editMode" v-model="user.email" placeholder="Email Address" />
              <InputText class="p-m-1 p-col-12 p-inputtext-sm" :disabled="editMode" v-model="user.phone" placeholder="Phone" />
            </div>
          </div>
        </div>

        <div class="general-info p-col-6 p-p-0 grid-item" v-if="!viewEdit">
          <div class="grid-item-title">
            Passwords & Security
          </div>
          <div class="grid-item-inner">
            <InputText
                class="p-m-1 p-col-12 p-inputtext-sm"
                :disabled="editMode"
                v-model="user.password"
                placeholder="Password" />
          </div>
        </div>


        <div class="general-info p-col-5 p-p-0 grid-item" v-if="!viewEdit">
          <div class="grid-item-title">
            Passwords & Security
          </div>
          <div class="grid-item-inner">
            <InputText
                class="p-m-1 p-col-12 p-inputtext-sm"
                :disabled="editMode"
                v-model="user.password"
                placeholder="Password" />
          </div>
        </div>


    </div>


    <div class="general-info p-m-2">
      <div class="left">

      </div>
      <div class="right">

      </div>
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
        editName: 'user-view',
        title: 'New User',
        description: 'Create a new user',
      },
      edit_mode: true,
      user: {
        uuid: null,
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: ''
      },
    }
  },
  computed: {
    /**
     * Returns a boolean if the page is in view/edit mode
     * true = view/edit mode
     * false = create mode
     */
    viewEdit: function() {
      return (this.$route.name === this.route.editName)
    },
    editMode: function() {
      if (!this.viewEdit) {
        return false;
      }
      return !(this.edit_mode && this.viewEdit);
    },
    editModeButton: function() {
      return (this.editMode) ? 'Edit User' : 'View User';
    },
    pageTitle: function() {
      if (this.$route.name === this.route.createName) {
        return 'New User';
      }
      if (this.viewEdit) {
        return 'Edit User'
      }
      return 'Issue Found'
    }
  },
  mounted() {
    if (this.viewEdit) {
      this.user.uuid = this.$route.params.userid;

      // Load the users details and save into user
      this.loadUser();
    }
  },
  methods: {
    toggleEdit: function() {
      this.edit_mode = !this.edit_mode;
    },
    loadUser: async function() {
      try {
        let response = await $http.get('http://localhost:8000/api/v1/users/' + this.user.uuid);
        let data = response.data;

        // Send request to create new user
        if (data.status === false) {
          console.log('%cCould not retrieve user', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
        }

        this.user = data.user;
      }
      catch (error) {
        console.log('%cCould not retrieve user', "color:red");
        console.log(error);
      }
    },
    saveUser: async function() {
      try {
        let response = await $http.post('http://localhost:8000/api/v1/users/create', {
          'email': this.user.email,
          'firstname': this.user.firstname,
          'lastname': this.user.lastname,
          'password': this.user.password
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
  margin: 0;

  .grid-item-title {
    width: 100%;
    min-height: 2rem;
    border-bottom: 1px solid #e3e3e3;
    border-radius: 0;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    padding: 0.2rem 0.8rem;
    font-size: 1.2rem;
  }

  .grid-item-inner {
    padding: 2rem;
    text-align: center;
    display: flex;

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

}


.grid-item {
  background-color: #ffffff;
  //border: 1px solid #d9d9d9;
  border-radius: 0.25rem;
  box-shadow: 1px 0px 2px 1px rgba(187, 187, 187, 0.23);
}

.grid-item-inner {
  padding: 2rem;
}
</style>
