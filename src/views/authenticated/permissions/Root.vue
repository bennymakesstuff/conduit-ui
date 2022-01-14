<template>
  <div class="outer-content">

  <div v-if="$route.name===route.name" class="">
    <div class="route-header">
      <div class="details">
        <h1 class="route-title">{{ route.title }}</h1>
        <p class="route-description">{{ route.description }}</p>
      </div>
      <div class="center"></div>
      <div class="controls">
        <div>
        </div>
      </div>
    </div>

    <div>
      <DataTable class="p-datatable-sm"
                 :value="permissions"
                 showGridlines
                 responsiveLayout="scroll"
                 v-model:filters="filters"
                 filterDisplay="row"
                 :loading="loading"
                 rowGroupMode="rowspan"
                 groupRowsBy="permission_group.title"
                 :globalFilterFields="['identifier','title','description']">
        <template #header>
          <div class="p-d-flex p-jc-between">
            <span class="p-input-icon-left" style="font-size: 0.5rem !important;">
                <i class="pi pi-search" style="font-size: 0.9rem !important;"/>
                <InputText v-model="filters['global'].value" placeholder="Search" style="font-size: 0.8rem !important;"/>
            </span>
          </div>
        </template>
        <template #empty>
          No customers found.
        </template>
        <template #loading>
          Loading customers data. Please wait.
        </template>
        <Column field="active" header="Active" style="width: 1rem;text-align:center;" :sortable="true">
          <template #body="slotProps">
            <InputSwitch v-model="slotProps.data.active" class="record-toggle"/>
          </template>
        </Column>

        <Column field="permission_group.title" header="Permission Group" :sortable="true" style="width: 10rem !important;"></Column>

        <Column field="identifier" header="Identifier" :sortable="true" style="width: 10rem !important;"></Column>

        <Column field="title" header="Role" :sortable="true"></Column>

        <Column field="description" header="Description"></Column>

        <Column v-if="edit_permissions" field="active" header="" style="width: 5rem;text-align:center;">
          <template #body="slotProps">
            <button label="Edit" class="p-button-xs">
              <i class="pi pi-pencil"></i>
              <p>Edit</p>
            </button>
          </template>
        </Column>

        <template #footer></template>
      </DataTable>
    </div>
  </div>

  <router-view v-if="$route.name!==route.name"></router-view>

  </div>
</template>

<script>
import CreateRole from '@/views/authenticated/roles/RoleCreate.vue';
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import {$axios as $http} from "@/axios";

export default {
  name: 'PermissionRoot',
  components: {
    CreateRole
  },
  data: function() {
    return {
      route: {
        name: 'permissions',
        title: 'Permissions',
        description: null,
      },
      edit_permissions: false,
      loading: false,
      display_modal: true,
      checked: true,
      user: this.$store.getters.getUser || this.default_user,
      filters: {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'identifier': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'title': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'description': {value: null, matchMode: FilterMatchMode.CONTAINS},
      },
      permissions: []
    }
  },
  mounted() {
    this.getPermissions();
  },
  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    getPermissions: async function() {
      try {
        let response = await $http.get(this.$store.state.api + 'permissions');
        let data = response.data;

        // Check status of login response
        if (data.status === false) {
          console.log('%cCould not retrieve permission sets', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
        }

        this.permissions = data.permissions;
      }
      catch (error) {
        console.log('%cCould not retrieve permission sets', "color:red");
        console.log(error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme/main.scss';

.outer-content {
  padding: 1rem;
}

.slider-container {
  width: 20rem;
  height: 4rem;
  margin-left: 5rem;
  background-color: yellow;
}
</style>
