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
          <Button label="Check Permissions" class="p-m-1 p-button-sm" @click="generatePermissionSet"/>
          <Button label="Save" class="p-m-1 p-button-sm" @click="saveRole"/>
          <Button label="Cancel" class="p-m-1 p-button-sm" @click="close"/>
        </div>
      </div>
    </div>

    <div class="general-info p-m-2">
      <div class="left">
        <InputText class="p-m-1 p-col-12 p-inputtext-sm" v-model="new_role.identifier" placeholder="Identifier" />
        <InputText class="p-m-1 p-col-12 p-inputtext-sm" v-model="new_role.title" placeholder="Title" />
        <InputText class="p-m-1 p-col-12 p-inputtext-sm" v-model="new_role.description" placeholder="Description" />
      </div>
      <div class="right">
        <InputText class="p-m-1 p-col-12 p-inputtext-sm" v-model="new_role.group" placeholder="Role Group" />

      </div>
    </div>


    <Divider align="left">
      <div class="p-d-inline-flex p-ai-center">
        <i class="pi pi-user p-mr-2"></i>
        <b>Allowed Permissions</b>
      </div>
    </Divider>


    <!-- TABLES FOR PERMISSIONS -->
    <div>
      <TabMenu :model="permission_groups" v-model:activeIndex="activeIndex" style="font-size: 0.5rem; margin-bottom: 1rem;"/>

          <DataTable v-if="permissionsLoaded === true" class="p-datatable-sm permission-table"
                      :value="viewablePermissions"
                      showGridlines
                      responsiveLayout="scroll">
            <template #header>
              <h3 style="margin-top: 0;margin-bottom: 0.25rem;">
                <InputSwitch v-model="toggle_group[activeIndex]" @change="toggleGroup($event, permission_groups[activeIndex].uuid)" class="record-toggle"/>
                <div>{{ permission_groups[activeIndex].title }}</div>
              </h3>
              {{ permission_groups[activeIndex].description }}
            </template>
            <Column field="enabled" header="Allowed" style="width: 1rem;text-align:center;">
              <template #body="slotProps">
                <InputSwitch v-model="slotProps.data.enabled" @change="checkAllTogglesEnabled(slotProps.data.permission_group.uuid)" class="record-toggle"/>
              </template>
            </Column>
            <Column v-if="show_identifier" field="identifier" header="Identifier"></Column>
            <Column field="title" header="Role"></Column>
            <Column field="description" header="Description"></Column>
            <template #footer></template>
          </DataTable>

    </div>

  </div>
</template>

<script>
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import {$axios as $http} from "@/axios";

export default {
  name: 'UserSettings',
  data: function() {
    return {
      selectValue: null,
      route: {
        name: 'role-create',
        createName: 'role-create',
        editName: 'role-edit',
        title: '',
        description: 'Create a new role',
      },
      selected_group: null,
      activeIndex: 0,
      show_identifier: false,
      toggle_group: [],
      new_role: {
        identifier: '',
        title: '',
        description: '',
        group: '',
        permissions: []
      },
      omit_groups: [],
      permission_groups: [],
      permissions:  []
    }
  },
  computed: {
    permissionsLoaded: function() {
      if (this.permission_groups.length > 0 && this.permissions.length > 0) {
        return true;
      }
      return false;
    },
    viewablePermissions: function(){
      let activeIndex = this.activeIndex;
      let perm_group = {...this.permission_groups[activeIndex]};

      return this.permissions.filter(function (el) {
        return el.permission_group.uuid === perm_group.uuid;
      });
    },
    pageTitle: function() {
      if (this.$route.name === this.route.createName) {
        return 'New Role';
      }
      if (this.$route.name === this.route.editName) {
        return 'Edit Role'
      }
      return 'Issue Found'
    }
  },
  mounted() {
    this.getPermissionGroups();
    this.getPermissions();
  },
  methods: {

    checkAllTogglesEnabled: function(uuid) {
      let all_on_flag = true;

      let permissions_to_change = this.permissions.filter(function (el) {
        return el.permission_group.uuid === uuid;
      });

      for (let i = 0; i < permissions_to_change.length; i++) {
        if (permissions_to_change[i].enabled === false) {
         all_on_flag = false;
        }
      }

      if (all_on_flag === true) {
        this.toggle_group[this.activeIndex] = true;
      }
      else {
        this.toggle_group[this.activeIndex] = false;
      }

      // Save the permission set into the new role object
      this.generatePermissionSet();
    },

    /**
     * Toggles all permissions in a group on or off
     * @param event
     * @param uuid
     */
    toggleGroup: function(event, uuid){
      let new_status = this.toggle_group[this.activeIndex];

      let permissions_to_change = this.permissions.filter(function (el) {
        return el.permission_group.uuid === uuid;
      });

      for (let i = 0; i < permissions_to_change.length; i++) {
        permissions_to_change[i].enabled = new_status;
      }

      //
      this.generatePermissionSet();
    },
    /**
     * Retrieves a list of all permission groups
     * @returns {Promise<void>}
     */
    getPermissionGroups: async function() {
      try {
        let response = await $http.get(this.$store.state.api + 'permissions/groups');
        let data = response.data;

        // Get a list of permission groups
        if (data.status === false) {
          console.log('%cCould not retrieve permission groups', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
        }

        for (let i=0; i < data.permission_groups.length; i++) {
          data.permission_groups[i].label = data.permission_groups[i].title;
        }
        this.permission_groups = data.permission_groups;
      }
      catch (error) {
        console.log('%cCould not retrieve permission groups', "color:red");
        console.log(error);
      }
    },

    /**
     * Retrieves the list of permissions
     * @returns {Promise<void>}
     */
    getPermissions: async function() {
      try {
        let response = await $http.get(this.$store.state.api + 'permissions');
        let data = response.data;

        // Get a list of permissions
        if (data.status === false) {
          console.log('%cCould not retrieve permissions', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
        }

        // Set all permissions to not enabled if we are on the create view
        if (this.$route.name === this.route.createName) {
          for (let i=0; i < data.permissions.length; i++) {
            data.permissions[i].enabled = false;
          }
        }

        this.permissions = data.permissions;
      }
      catch (error) {
        console.log('%cCould not retrieve permissions', "color:red");
        console.log(error);
      }
    },

    /**
     * Saves the role by sending all the details to the api
     * @returns {Promise<void>}
     */
    saveRole: async function() {
      try {
        console.log(this.new_role);
        let response = await $http.post(this.$store.state.api + 'roles/create', {'new_role': this.new_role});
        let data = response.data;

        // Send request to create new role
        if (data.status === false) {
          this.$toast.add({
            severity: 'error',
            summary: 'Failed to create new role',
            detail: 'A server error occurred and the role could not be created.',
            life: 3000,
            styleClass: 'compact-toast'
          });
          console.log('%cCould not create new role', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
        }
        else {
          this.$toast.add({
            severity: 'success',
            summary: 'New Role Created',
            detail: `The role "${this.new_role.title}" has been created.`,
            life: 3000,
            styleClass: 'compact-toast'
          });
          this.emit('created-role');
          this.navigateTo('roles');
        }
      }
      catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Failed to create new role',
          detail: 'A server error occurred and the role could not be created.',
          life: 3000,
          styleClass: 'compact-toast'
        });
        console.log('%cCould not create new role', "color:red");
        console.log(error);
      }
    },

    /**
     * Builds an array of enabled permissions
     * @returns {*[]}
     */
    generatePermissionSet: function() {
      let allowed_permissions = [];
      let permissions = this.permissions;

      // Iterate through the permissions and get the permissions where enabled is true.
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].enabled === true) {
          allowed_permissions.push(permissions[i].identifier);
        }
      }

      // Save permissions to new role
      this.new_role.permissions = allowed_permissions;
      return allowed_permissions;
    },

    /**
     * Returns the user to the list view of roles
     */
    close: function() {
      this.navigateTo('roles');
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
