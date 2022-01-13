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
          <Button label="Save" class="button-set p-m-1 p-button-sm" @click="saveRole"/>
          <Button label="Cancel" class="button-set p-m-1 p-button-sm" @click="close"/>
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
        <b>Permissions</b>
      </div>
    </Divider>


    <!-- TABLES FOR PERMISSIONS -->
    <div>
      <select v-if="false">
        <option v-for="(group, index) in permission_groups" :key="index">{{group.title}}</option>
      </select>
      <Dropdown
          class="p-mb-2"
          v-model="selected_group"
          :options="permission_groups"
          optionLabel="title"
          placeholder="Add Permission Group"
          :filter="true"
          filterPlaceholder="Find Group"/>

        <DataTable  class="p-datatable-sm permission-table"
                    v-for="group in permissions"
                    :key="group.group_id"
                   :value="group.permissions"
                   showGridlines
                   responsiveLayout="scroll">
          <template #header>
            <h3 style="margin-top: 0;margin-bottom: 0.25rem;">{{ group.title }}</h3>
            {{ group.description }}
          </template>
          <Column field="active" header="Active" style="width: 1rem;text-align:center;">
            <template #body="slotProps">
              <InputSwitch v-model="slotProps.data.active" class="record-toggle"/>
            </template>
          </Column>
          <Column field="identifier" header="Identifier"></Column>
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
      route: {
        name: 'role-create',
        createName: 'role-create',
        editName: 'role-edit',
        title: '',
        description: 'Create a new role',
      },
      selected_group: null,
      new_role: {
        identifier: '',
        title: '',
        description: '',
        group: '',
        permissions: []
      },
      omit_groups: [],
      permission_groups: [],
      permissions: [
        {
          "group_id": 0,
          "title": "User Management",
          "description": "Permissions for managing users",
          "permissions": [
            {
              "id": 0,
              "active": true,
              "identifier": 'users:create',
              "title": 'Create Users',
              "description": 'Can create new users in the system'
            },
            {
              "id": 2,
              "active": true,
              "identifier": 'users:delete',
              "title": 'Delete Users',
              "description": 'Can delete users from the system'
            }
          ]
        },
        {
          "group_id": 0,
          "title": "Role Management",
          "description": "Manage roles within the system",
          "permissions": [
            {
              "id": 0,
              "active": true,
              "identifier": 'role:create',
              "title": 'Permission Title',
              "description": 'This is a permission'
            },
            {
              "id": 2,
              "active": true,
              "identifier": 'role:delete',
              "title": 'Second Permission Title',
              "description": 'This is another permission'
            }
          ]
        },

        {
          "group_id": 0,
          "title": "Role Management",
          "description": "Manage roles within the system",
          "permissions": [
        {
          "id": 0,
          "active": true,
          "identifier": 'role:create',
          "title": 'Permission Title',
          "description": 'This is a permission'
        },
        {
          "id": 2,
          "active": true,
          "identifier": 'role:delete',
          "title": 'Second Permission Title',
          "description": 'This is another permission'
        }
      ]
    }

      ]
    }
  },
  computed: {
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
  },
  methods: {
    addPermissionGroup: function() {
      console.log('A thing');
    },

    getPermissionGroups: async function() {
      try {
        let response = await $http.get('http://localhost:8000/api/v1/permissions/groups');
        let data = response.data;

        // Get a list of permission groups
        if (data.status === false) {
          console.log('%cCould not retrieve permission groups', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
        }

        this.permission_groups = data.permission_groups;
      }
      catch (error) {
        console.log('%cCould not retrieve permission groups', "color:red");
        console.log(error);
      }
    },
    saveRole: async function() {
      try {
        let response = await $http.post('http://localhost:8000/api/v1/roles/create', {'new_user': this.new_role});
        let data = response.data;

        // Send request to create new role
        if (data.status === false) {
          console.log('%cCould not create new role', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
        }

        this.navigateTo('roles');
      }
      catch (error) {
        console.log('%cCould not create new role', "color:red");
        console.log(error);
      }
    },
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
