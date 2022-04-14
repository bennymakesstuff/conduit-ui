<template>
  <div>

    <TabMenu :model="items" style="font-size: 0.5rem;"/>
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'ApplicationSettingsRoot',
  components: {
  },
  data: function() {
    return {
      app_settings: {
        title: null,
        logo: null
      },
      items: [
        {label: 'Basic', icon: 'pi pi-fw pi-home', to: {name: 'app_settings_basic'}},
        {label: 'Branding', icon: 'pi pi-fw pi-calendar', to:  {name: 'app_settings_branding'}},
        {label: 'Theme', icon: 'pi pi-fw pi-pencil', to: ''},
        {label: 'System', icon: 'pi pi-fw pi-file', to: ''},
        {label: 'Server', icon: 'pi pi-fw pi-cog', to: ''}
      ]
    }
  },
  mounted() {
    // Hide the page loader
    this.$store.dispatch('TOGGLE_LOADER', false);
  },
  methods: {
    dothing: function(){
      alert('Thing');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme/main.scss';

.slider-container {
  width: 20rem;
  height: 4rem;
  margin-left: 5rem;
  background-color: yellow;
}
</style>
