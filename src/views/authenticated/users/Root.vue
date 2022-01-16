<template>
  <div class="outer-content">

    <router-view v-if="$route.name!==route.name"></router-view>
    <UserList v-if="$route.name===route.name"></UserList>

  </div>
</template>

<script>
import UserList from '@/views/authenticated/users/UserList.vue';

export default {
  name: 'UserRoot',
  components: {
    UserList
  },
  data: function() {
    return {
      route: {
        name: 'users',
        title: 'User Management',
        description: null,
      },
    }
  },
  methods: {
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
