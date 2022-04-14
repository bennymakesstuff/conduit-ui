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
          <Button v-if="viewEdit && checkPermission('user:update')" :label="editModeButton" class="p-m-1 p-button-sm" @click="toggleEdit"/>
          <Button v-if="!viewEdit" label="Create" class="p-m-1 p-button-sm" @click="saveUser('create')"/>
          <Button label="Back to List" class="p-m-1 p-button-sm" @click="close"/>
        </div>
      </div>

      <div class="p-grid">
        <div class="general-info p-p-0 grid-item">
          <div class="grid-item-title">

          </div>
          <div class="grid-item-inner">
            <div class="profile-picture-area">
              <div class="profile-picture">
                <div v-if="hasProfileImage" class="profile-image">
                  <img style="height:100%; width: 100%" :src="`http://localhost:8000/images/${user.uuid}/profile.png`">
                </div>
                <div v-if="!hasProfileImage" class="profile-initials">BB</div>
              </div>
              <FileUpload mode="basic" name="image" @progress="uploadStatus" chooseLabel="Upload Profile" :auto="true" :customUpload="true" @uploader="uploadProfileImage" />
            </div>
            <div class="details-area" style="padding-right: 1rem;">
              <div>
                <span class="p-float-label" style="width: calc(50% - 0.5rem); display: inline-block; margin-right: 1rem;">
                    <InputText class="p-m-1 p-inputtext-sm" :disabled="editMode" v-model="user.firstname" id="firstname" />
                    <label for="firstname">Given Name</label>
                </span>
                <span class="p-float-label" style="width: calc(50% - 0.5rem);display: inline-block;">
                    <InputText class="p-m-1 p-inputtext-sm" :disabled="editMode" v-model="user.lastname" id="surname" />
                    <label for="surname">Surname</label>
                </span>
              </div>
              <div>
                <span class="p-float-label">
                    <InputText class="p-m-1 p-inputtext-sm" :disabled="editMode" v-model="user.email" id="email-address" />
                    <label for="email-address">Email Address</label>
                </span>
                <span class="p-float-label">
                    <InputMask mask="(99)99 999 999" class="p-m-1 p-inputtext-sm" :disabled="editMode" v-model="user.phone" id="phone" />
                    <label for="phone">Phone Number</label>
                </span>
              </div>
          </div>

          </div>
        </div>


        <!-- GENERAL INFORMATION WIDGET -->
        <div class="general-info p-p-0 grid-item" style="min-width: 5rem;" v-if="!viewEdit && checkPermission('user:update')">
          <div class="p-p-1">
            <div class="grid-item-title">
              New User's Password
            </div>
            <div class="grid-item-inner">

              <p>Send via Email?</p>
              <div class="password">
                <span class="p-float-label">
                    <InputText
                        class="p-m-0 p-inputtext-sm"
                        :disabled="editMode"
                        v-model="user.password"
                        style="margin: 0;"
                        id="password"/>
                    <label for="password">Password</label>
                </span>
              </div>

              <div class="p-d-block" style="margin-top: -0.75rem; float:right;">
                <button class="p-button-xs" style="cursor: pointer;padding: 0.5rem !important;" @click="generatePassword">
                  Generate Strong Password
                </button>
              </div>

            </div>
          </div>
        </div>
        <!-- GENERAL INFORMATION WIDGET -->

        <!-- PASSWORDS & SECURITY WIDGET -->
        <div class="general-info p-p-0 grid-item" v-if="viewEdit && (this.checkPermission('user:create') || this.checkPermission('user:update'))">
          <div class="grid-item-title">
            Passwords & Security
          </div>
          <div class="grid-item-inner">
            <InputText
                class="p-m-1 p-inputtext-sm"
                :disabled="editMode"
                v-model="user.password"
                placeholder="Password" />
          </div>
        </div>
        <!-- PASSWORDS & SECURITY WIDGET -->

        <!-- ROLES & PERMISSIONS WIDGET -->
          <div class="general-info p-p-0 grid-item" style="padding-bottom: 1rem;"  v-if="viewEdit && checkPermission('user:update')">
            <div class="grid-item-title">
              Roles & Permissions
              <Badge v-if="user.roles.length > 0" :value="user.roles.length" style="margin-left: 0.5rem; margin-top: 0.25rem;"></Badge>
            </div>
            <div class="grid-item-inner user-roles-widget">
              <div v-if="!editMode" style="display: block;">
                <Dropdown :disabled="editMode" class="available-roles" :options="viewableRoles" optionLabel="title" placeholder="Add a Role" :filter="true" filterPlaceholder="Search Roles">
                  <template #loading>
                    <div>
                      <span>Loading Roles</span>
                    </div>
                  </template>
                  <template #option="slotProps">
                    <div class="p-dropdown-option role-option" @click="addRoleToUser(slotProps.option.uuid)" style="height: 100%; padding: 0;margin: 0;">
                      <div class="role-title">{{slotProps.option.title}}</div>
                      <div class="role-description">{{slotProps.option.description}}</div>
                    </div>
                  </template>
                </Dropdown>
              </div>
              <div>
                <div class="">
                  <DataTable class="p-datatable-sm"
                             :value="user.roles"
                             showGridlines
                             responsiveLayout="scroll"
                             scrollHeight="10rem"
                             style="min-width: 18rem;">
                    <template #header>Active Roles</template>
                    <template #empty>
                      <div  style="text-align: center; width: 100%; padding: 1rem; color: #8d8d8d;">
                        No roles assigned.
                      </div>
                    </template>
                    <template #loading>
                      Loading users roles. Please wait.
                    </template>

                    <Column field="title" header="Role" style="width: 15rem;">
                      <template #body="slotProps">
                        <div class="role-title">{{slotProps.data.title}}</div>
                        <div class="role-description">{{slotProps.data.description}}</div>
                      </template>
                    </Column>

                    <Column v-if="viewEdit" header="Active From">
                      <template #body="slotProps">
                        {{this.humanDate(slotProps.data.active_from)}}
                      </template>
                    </Column>


                    <Column v-if="!editMode" field="active" header="" style="width: auto;text-align:center;">
                      <template #body="slotProps">
                        <button class="p-button-xs" style="cursor: pointer;padding: 0.3rem !important;">
                          <i class="pi pi-trash" style="font-size: 0.8rem;" @click="removeRoleFromUser(slotProps.data.uuid)"></i>
                        </button>
                      </template>
                    </Column>

                    <template #footer></template>
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        <!-- ROLES & PERMISSIONS WIDGET -->

        <!-- ACTIVITY WIDGET -->
        <div class="general-info p-p-0 grid-item" v-if="viewEdit">
          <div class="grid-item-title">
            Activity
          </div>
          <div class="grid-item-inner">

          </div>
        </div>
        <!-- ACTIVITY WIDGET -->





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
import {$axios, $axios as $http} from "@/axios";

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
      edit_mode: false,
      user: {
        image: null,
        uuid: null,
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        roles: []
      },
      available_roles: [],
      selected_role: null,
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
      return (this.editMode) ? 'Edit User' : 'Save User';
    },
    pageTitle: function() {
      if (this.$route.name === this.route.createName) {
        return 'New User';
      }
      if (this.viewEdit) {
        return 'Edit User'
      }
      return 'Issue Found'
    },
    hasProfileImage: function() {
      return this.user.image !== null;
    },

    /**
     * Shows a filtered list of roles that the user does not already have assigned
     * @returns {*[]}
     */
    viewableRoles: function(){
      let user_roles = this.user.roles;

      return this.available_roles.filter(function (el) {
        let found_flag = true;
        for (let i = 0; i < user_roles.length; i++) {
          if (el.uuid === user_roles[i].uuid) {
            found_flag = false;
          }
        }
        return found_flag;
      });
    },
  },
  mounted() {

    // Only run these methods if in user "Edit" mode
    if (this.viewEdit) {
      this.user.uuid = this.$route.params.userid;

      // Load the users details and save into user
      this.loadUser();
    }

    // Only run these methods if in user "Create" mode
    if (!this.viewEdit) {
      // Actions here
      // Hide the page loader
      this.$store.dispatch('TOGGLE_LOADER', false);
    }

    // Always perform these methods
    this.getRoles();
  },
  methods: {
    checkURL: function() {
      let response = $http.get('http://localhost:8000/api/v1/users/profile-image');
      console.log(response);
    },
    toggleEdit: function() {
      if (this.edit_mode === true) {
        this.saveUser('update');
      }
      this.edit_mode = !this.edit_mode;
    },
    uploadStatus: function(event) {
      alert('File Uploading...');
      console.log(event);
    },
    uploadProfileImage: async function(event) {
      console.log(event.files[0]);
      const formData = new FormData();
      formData.append("image", event.files[0]);
      formData.append("user", this.user.uuid);
      console.log(this.user.uuid);
      let response = await $http.post(this.$store.state.api + 'users/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
    },
    loadUser: async function() {
      try {
        let response = await $http.get(this.$store.state.api + 'users/' + this.user.uuid);
        let data = response.data;
        console.log(data);

        // Send request to create new user
        if (data.status === false) {
          console.log('%cCould not retrieve user', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
        }

        this.user = data.user;
        // Hide the page loader
        this.$store.dispatch('TOGGLE_LOADER', false);
      }
      catch (error) {
        console.log('%cCould not retrieve user', "color:red");
        console.log(error);
        // Hide the page loader
        this.$store.dispatch('TOGGLE_LOADER', false);
      }
    },
    saveUser: async function(create_or_update = 'create') {
      try {
        let url = 'users/create'
        if (create_or_update === 'update') {
          url = 'users/update'
        }

        let response = await $http.post(this.$store.state.api + url, {
          'uuid': this.user.uuid,
          'user': this.user,
        });

        let data = response.data;

        // Send request to create new user
        if (data.status === false) {
          this.$toast.add({
            severity: 'error',
            summary: 'Failed to create new user',
            detail: 'A server error occurred and the user could not be created.',
            life: 3000,
            styleClass: 'compact-toast'
          });
          console.log('%cCould not create new user', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
        }
        else {
          this.navigateTo('users');

          if (create_or_update === 'update') {
            this.$toast.add({
              severity: 'success',
              summary: 'Updated User',
              detail: `"${this.user.firstname} ${this.user.lastname}" has been updated.`,
              life: 3000,
              styleClass: 'compact-toast'
            });
            this.$emit('created-updated');
          } else {
            this.$toast.add({
              severity: 'success',
              summary: 'New User Created',
              detail: `"${this.user.firstname} ${this.user.lastname}" has been added.`,
              life: 3000,
              styleClass: 'compact-toast'
            });
            this.$emit('created-user');
          }
        }
      }
      catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Failed to create new user',
          detail: 'A server error occurred and the user could not be created.',
          life: 3000,
          styleClass: 'compact-toast'
        });
        console.log('%cCould not create new user', "color:red");
        console.log(error);
      }
    },
    getRoles: async function() {
      try {
        let response = await $http.get(this.$store.state.api + 'roles');
        let data = response.data;

        // Check status of login response
        if (data.status === false) {
          console.log('%cCould not retrieve roles', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
        }

        this.available_roles = data.roles;
      }
      catch (error) {
        console.log('%cCould not retrieve roles', "color:red");
        console.log(error);
      }
    },


    addRoleToUser: async function(uuid, update_ui_only = false) {
      let role = this.available_roles.find(element => element.uuid === uuid);
      if (role) {
        let date = new Date();
        role.active_from = date.toISOString();
        this.user.roles.push(role);
        this.selected_role = null;

        // Do this by default, otherwise only update the list in the UI
        if (update_ui_only !== true) {
          try {
            let response = await $http.post(this.$store.state.api + 'users/add-role', {
              'user': this.user.uuid,
              'role': uuid
            });
            let data = response.data;

            // Check status of login response
            if (data.status === false) {
              this.removeRoleFromUser(uuid);
              console.log('%cCould not add role to the user', "color:red");
              console.log('%cMessage: %c' + data.message, "color:red", "color:black");
            }

            this.$toast.add({
              severity: 'success',
              summary: 'User updated',
              detail: `"Role added to ${this.user.firstname}".`,
              life: 3000,
              styleClass: 'compact-toast'
            });

          } catch (error) {
            this.removeRoleFromUser(uuid);
            console.log('%cCould not add role to the user', "color:red");
            console.log(error);
          }
        }
      }
    },


    removeRoleFromUser: async function(uuid) {
      // TODO: Get is function working properly. (Need to not delete the record but deactivate it)
      // TODO:   This is for history purposes. Should have a record of what roles peoples have had and when
      this.user.roles.splice(this.user.roles.findIndex(item => item.uuid === uuid), 1);
      try {
        let response = await $http.post(this.$store.state.api + 'users/remove-role', {
          'user': this.user.uuid,
          'role': uuid
        });
        let data = response.data;

        // Check status of login response
        if (data.status === false) {
          this.addRoleToUser(uuid, true);
          console.log('%cCould not remove role', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
        }

        this.$toast.add({
          severity: 'success',
          summary: 'User updated',
          detail: `"Role removed from ${this.user.firstname}".`,
          life: 3000,
          styleClass: 'compact-toast'
        });
      }
      catch (error) {
        this.addRoleToUser(uuid, true);
        console.log('%cCould not remove role', "color:red");
        console.log(error);
      }

    },

    generatePassword: function() {
      this.user.password = this.generateStrongPassword();
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

.user-roles-widget {
  display: block !important;

  > div {
    text-align: left;
  }

  .title {
    font-size: 0.8rem;
  }

}


.role-option > div {
  pointer-events: none;
}

.role-title {}
.role-description {
  color: #ababab;
  font-size: 0.6rem;
}

.role-option {

}

.available-roles {

  > .p-dropdown-items-wrapper {
    border: 3px solid red;
    > .p-dropdown-items {
      > .p-dropdown-item {
        padding: 0 !important;
      }
    }
  }

}

.p-dropdown-item:has(> .role-option) {background-color: pink !important;}


.profile-picture-area {
  padding: 1rem;
  margin: 0;
  width: auto;
  min-width: 8rem;
  //border: 1px solid green;
  display: inline-block;
  vertical-align: top;

  > .profile-picture {
    background-color: #f5f5f5;
    border-radius: 50%;
    height: 8rem;
    width: 8rem;
    border: 1px solid #e3e3e3;
    overflow: hidden;


    > .profile-initials {
      background-color: transparent;
      width: 100%;
      height: 100%;
      font-weight: 300;
      color: #b7b7b7;
      text-align: center;
      @include vertical-align(middle);
      font-size: 4rem;
    }
  }
}

.password {
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0;

  > span {
    > .p-inputtext-sm {
      margin-bottom: 0 !important;
    }
  }
}

</style>
