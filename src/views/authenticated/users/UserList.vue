<template>
  <div>

    <div>
      <div class="route-header">
        <div class="details">
          <h1 class="route-title">{{ route.title }}</h1>
          <p class="route-description">{{ route.description }}</p>
        </div>
        <div class="center"></div>
        <div class="controls">
          <div>
            <Button v-if="checkPermission('user:create')" label="Create User" @click="navigateTo('user-create')" class="p-button-sm" />
          </div>
        </div>
      </div>

      <div>
        <DataTable class="p-datatable-sm"
                   :value="viewableUsers"
                   showGridlines
                   responsiveLayout="scroll"
                   v-model:filters="filters"
                   filterDisplay="row"
                   :loading="loading"
                   :globalFilterFields="['firstname', 'lastname', 'description', 'email', 'phone']">
          <template #header>
            <div class="p-d-flex p-jc-between">
            <span class="p-input-icon-left" style="font-size: 0.5rem !important;">
                <i class="pi pi-search" style="font-size: 0.9rem !important;"/>
                <InputText v-model="filters['global'].value" placeholder="Search" style="font-size: 0.8rem !important;"/>
            </span>
            </div>
          </template>
          <template #empty>
            <ListEmpty label="No customers found."/>
          </template>
          <template #loading>
            <ListEmpty label="Loading customers data. Please wait."/>
          </template>
          <Column field="active" header="Active" style="width: 1rem;text-align:center;" :sortable="true">
            <template #body="slotProps">
              <InputSwitch v-model="slotProps.data.active" class="record-toggle"/>
            </template>
          </Column>

          <Column header="Name" style="width: 12rem;" :sortable="true">
            <template #body="slotProps">
              <Avatar :label="`${slotProps.data.firstname[0]}${slotProps.data.lastname[0]}`" shape="circle" size="small"/>
              <span style="margin-left: 0.5rem;">{{slotProps.data.firstname}} {{slotProps.data.lastname}}</span>
            </template>
          </Column>

          <Column field="email" header="Email Address" :sortable="true"></Column>
          <Column field="phone" header="Phone" :sortable="true"></Column>

          <Column field="active" header="" style="width: 6rem; text-align:center;">
            <template #body="slotProps">
              <button v-if="checkPermission('user:view') && !checkPermission('user:update')" label="View" class="p-button-xs" @click="navigateTo('user-view', {userid: slotProps.data.uuid})">
                <i class="pi pi-eye"></i>
                <p>View</p>
              </button>
              <button v-if="checkPermission('user:update')" label="Edit" class="p-button-xs" @click="navigateTo('user-view', {userid: slotProps.data.uuid})">
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
import {FilterMatchMode} from 'primevue/api';
import {$axios as $http} from "@/axios";
import ListEmpty from "@/components/ListEmpty.vue";

export default {
  name: 'UserList',
  components: {
    ListEmpty
  },
  data: function() {
    return {
      route: {
        name: 'users-list',
        title: 'Users',
        description: null,
      },
      loading: false,
      display_modal: true,
      checked: true,
      user: this.$store.getters.getUser || this.default_user,
      filters: {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'title': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'description': { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      users: []
    }
  },
  computed: {
    /**
     * Shows the list of users without the logged in user in it
     * @returns {*[]}
     */
    viewableUsers: function(){
      let current_user_id = this.$store.getters.getUser.uuid;

      return this.users.filter(function (el) {
        return el.uuid !== current_user_id;
      });

    },
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    /**
     * Returns a list of users
     * @returns {Promise<void>}
     */
    getUsers: async function() {
      try {
        let response = await $http.get(this.$store.state.api + 'users');
        let data = response.data;

        // Check status of login response
        if (data.status === false) {
          console.log('%cCould not retrieve users', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
          this.$toast.add({
            severity: 'error',
            summary: 'Could not retrieve users',
            detail: data.message || 'A Server error occurred.',
            life: 3000,
            styleClass: 'compact-toast'
          });
        }

        this.users = data.users;
        // Hide the page loader
        this.$store.dispatch('TOGGLE_LOADER', false);
      }
      catch (error) {
        console.log('%cCould not retrieve users', "color:red");
        console.log(error);
        this.$toast.add({
          severity: 'error',
          summary: 'Could not retrieve users',
          detail: data.message || 'A Server error occurred.',
          life: 3000,
          styleClass: 'compact-toast'
        });
        // Hide the page loader
        this.$store.dispatch('TOGGLE_LOADER', false);
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

.p-column-filter-clear-button {
  display: none !important;
}
</style>
