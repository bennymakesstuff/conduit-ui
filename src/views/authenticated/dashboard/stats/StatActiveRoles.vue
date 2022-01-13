<template>
  <div class="p-col-2 p-m-2 p-text-center">
    <Knob v-model="stats.roles" :min="0" :max="20" :readonly="true"/>
    <div class="stat-text">System Roles</div>
  </div>
</template>

<script>

import {$axios as $http} from "@/axios";

export default {
  name: 'StatTotalRoles',
  components: {
  },
  data: function() {
    return {
      stats: {
        roles: 0
      },
      checkAgain: null
    }
  },
  mounted() {
    this.getRolesCount();
    setInterval(this.getRolesCount, 10000);
  },
  methods: {
    getRolesCount: async function() {
      try {
        let response = await $http.get('http://localhost:8000/api/v1/roles/count');
        let data = response.data;

        // Get the number of users in the system
        if (data.status === false) {
          console.log('%cCould not retrieve roles count', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
        }

        this.stats.roles = data.count;
      }
      catch (error) {
        console.log('%cCould not retrieve roles count', "color:red");
        console.log(error);
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/theme/main.scss';
</style>
