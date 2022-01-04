import { createApp, h } from 'vue'
import App from './App.vue'
import { router } from './router'
import { RouterView } from 'vue-router';
import store from './store'
import axios from 'axios';
import PrimeVue from 'primevue/config';

// Import PrimeView Styles
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-blue/theme.css';       //theme
import 'primevue/resources/primevue.min.css';              //core css
import 'primeflex/primeflex.css';

// Import Components
import InputText from "primevue/inputtext";
import Button from 'primevue/button';
import Password from "primevue/password";
import Menubar from 'primevue/menubar';
import ToastService from 'primevue/toastservice';
import Toast from "primevue/toast";

// Create a Vue instance
const app  = createApp({
    render: ()=>h(App)
});

const DEFAULT_SERVER = 'https://localhost:8080/';

// Plugins
app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.config.globalProperties.axios=axios;

app.component('InputText', InputText);
app.component('Password', Password);
app.component('Button', Button);
app.component('router-view', RouterView);
app.component('Menubar', Menubar);
app.component('Toast', Toast);


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
