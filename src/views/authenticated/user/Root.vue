<template>
  <div>

      <Menubar :model="items" class="p-m-4"/>

    <div class="button-group">
      <button @click="navigateTo('user_profilesettings')">Settings</button>
      <button @click="navigateTo('user_utilities')">Utilities</button>
    </div>

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'UserRoot',
  components: {
  },
  data: function() {
    return {
      default_user: {
        username: '',
        given_name: '',
        surname: '',
      },
      user: this.$store.getters.getUser || this.default_user,
      items: [
        {
          label: 'My Account',
          icon: 'pi pi-fw pi-user',
          to: 'user_profilesettings'
        },
        {
          label:'File',
          icon:'pi pi-fw pi-file',
          items:[
            {
              label:'New',
              icon:'pi pi-fw pi-plus',
              items:[
                {
                  label:'Bookmark',
                  icon:'pi pi-fw pi-bookmark'
                },
                {
                  label:'Video',
                  icon:'pi pi-fw pi-video'
                },

              ]
            },
            {
              label:'Delete',
              icon:'pi pi-fw pi-trash'
            },
            {
              separator:true
            },
            {
              label:'Export',
              icon:'pi pi-fw pi-external-link'
            }
          ]
        },
      ]
    }
  },
  mounted() {
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
