import { createApp, h } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import api  from './api'

// Create a Vue instance
const app  = createApp({
    render: ()=>h(App)
});

const DEFAULT_SERVER = 'https://localhost:8080/';

// User Plugins
app.use(store);
app.use(router);
app.use(api);

// Add custom mixin methods
app.mixin({
  methods: {
    /**
     * Navigates to a given named route
     */
    navigateTo: function(route) {
      router.push({name: route});
    },
    /**
     * Logs out the application user
     */
    logout_user: function() {
      store.dispatch('LOGOUT_USER');
    },
    /**
     * Checks if the current user is Authenticated
     */
    userIsAuthenticated: function() {
      return (this.$store.state.user.username != null);
    },

    get: async function(url = '', server = default_server) {
      const response = await fetch(server+url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //  body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    },

    post: async function(url = '', data = {}, server = DEFAULT_SERVER) {
      const response = await fetch(server+url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

  }
})

// Mount the application to the DOM
app.mount('#app')
