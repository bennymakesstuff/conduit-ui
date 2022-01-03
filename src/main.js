import { createApp, h } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import axios from 'axios';

// Create a Vue instance
const app  = createApp({
    render: ()=>h(App)
});

const DEFAULT_SERVER = 'https://localhost:8080/';

// Plugins
app.use(store);
app.use(router);
app.config.globalProperties.axios=axios;

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

    /**
     * API Get Request
     * @param  {String} [url='']
     * @param  {String} [server=default_server]
     * @return {string}
     */
    get: async function(url = '', server = default_server) {
      const response = await fetch(server+url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
      return response.json();
    },

    /**
     * API Post Request
     * @param  {String} [url='']
     * @param  {String} [server=default_server]
     * @return {string}
     */
    post: async function(url = '', data = {}, server = DEFAULT_SERVER) {
      const response = await fetch(server+url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      });
      return response.json();
    }

  }
})

// Mount the application to the DOM
app.mount('#app')
