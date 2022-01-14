import { createApp, h } from 'vue'
import App from './App.vue'
import { router } from './router'
import { RouterView } from 'vue-router';
import store from './store'
import axios, {$axios as $http} from 'axios';
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
import ProgressSpinner from 'primevue/progressspinner';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputSwitch from 'primevue/inputswitch';
import Dialog from 'primevue/dialog';
import OverlayPanel from 'primevue/overlaypanel';
import Tooltip from 'primevue/tooltip';
import Divider from 'primevue/divider';
import TabMenu from 'primevue/tabmenu';
import Knob from 'primevue/knob';
import Dropdown from 'primevue/dropdown';

// Application Settings
const ROUTE_REHYDRATION = true; // Turn this off for production
const DEFAULT_SERVER = 'https://localhost:8080/';

// Create a Vue instance
const app  = createApp({
    render: ()=>h(App)
});

// Activate Plugins
let plugins = [
  store, router, PrimeVue, ToastService
]
plugins.forEach((x) => app.use(x));
app.config.globalProperties.axios=axios;

app.component('InputText', InputText);
app.component('Password', Password);
app.component('Button', Button);
app.component('router-view', RouterView);
app.component('Menubar', Menubar);
app.component('Toast', Toast);
app.component('ProgressSpinner', ProgressSpinner);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputSwitch', InputSwitch);
app.component('Dialog', Dialog);
app.component('OverlayPanel', OverlayPanel);
app.component('Divider', Divider);
app.component('Knob', Knob);
app.component('TabMenu', TabMenu);
app.component('Dropdown', Dropdown);

app.directive('tooltip', Tooltip);


// Add custom mixin methods
app.mixin({
  methods: {
    /**
     * Navigates to a given named route
     */
    navigateTo: function(route, params = null, is_path = false) {
      if (params) {
        if (is_path) {
          router.push({path: route, params: params});
        }
        else {
          router.push({name: route, params: params});
        }
      }
      else {
        if (is_path) {
          console.log('Hitting here');
          router.push({path: route});
        }
        else {
          router.push({name: route});
        }
      }
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

// Rehydrate the route from session storage if turned on. Used on local development
if (ROUTE_REHYDRATION === true) {
  let application_route = JSON.parse(sessionStorage.getItem('application_route'));
  if (application_route !== null) {
    router.push({path: application_route.fullPath});
  }
}
