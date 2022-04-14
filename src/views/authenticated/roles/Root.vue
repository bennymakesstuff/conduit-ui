<template>
  <div class="outer-content">

    <router-view v-if="$route.name!==route.name"></router-view>

    <RoleList v-if="$route.name===route.name" />

  </div>
</template>

<script>
import RoleList from '@/views/authenticated/roles/RoleList.vue';

export default {
  name: 'RolesRoot',
  components: {
    RoleList
  },
  data: function() {
    return {
      route: {
        name: 'roles',
        title: 'Roles',
        description: null,
      },
    }
  },
  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },
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
