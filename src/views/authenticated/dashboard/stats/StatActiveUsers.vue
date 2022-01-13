<template>
  <div class="p-col-2 p-m-2 p-text-center">
    <Knob v-model="stats.users" :min="0" :max="20" :readonly="true"/>
    <div class="stat-text">Active Users</div>
  </div>
</template>

<script>

import {$axios as $http} from "@/axios";

export default {
  name: 'StatTotalUsers',
  components: {
  },
  data: function() {
    return {
      stats: {
        users: 0
      },
      checkAgain: null
    }
  },
  mounted() {
    this.getUserCount();
    setInterval(this.getUserCount, 10000);
  },
  methods: {
    getUserCount: async function() {
      try {
        let response = await $http.get('http://localhost:8000/api/v1/users/count');
        let data = response.data;

        // Get the number of users in the system
        if (data.status === false) {
          console.log('%cCould not retrieve user count', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
        }

        this.stats.users = data.count;
      }
      catch (error) {
        console.log('%cCould not retrieve user count', "color:red");
        console.log(error);
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/theme/main.scss';
</style>
