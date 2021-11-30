import { createApp, h } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
//import API from './api'

// Create a Vue instance
const app  = createApp({
    render: ()=>h(App)
});

// User Plugins
app.use(store);
app.use(router);
//app.use(API);

// Add custom mixin methods
app.mixin({
  methods: {
    navigateTo: function(route){
      console.log(route);
      router.push({name: route});
    }
  }
})

// Mount the application to the DOM
console.log(app)
app.mount('#app')
