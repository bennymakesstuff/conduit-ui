import { createStore, install } from 'vuex'
import { $axios } from '@/axios'
import { unwrapProxy } from '@/helper';

// Import Vuex Modules
import { user } from './user.js'

export default createStore({
  modules: {
    user
  },
  state: {
    application_route: null,
    api: "http://localhost:8000/api/v1/",
    application_config: {
      date_format: 'AU'
    },
    ui: {
      compact_navigation: false,
      show_loader: true,
      show_loader_text: false
    }
  },
  mutations: {
    /**
     * Toggles the size of the navigation Menu
     * @param state
     */
    toggle_navigation_size (state) {
      state.ui.compact_navigation = !state.ui.compact_navigation
    },

    /**
     * Updates the current route in state
     * @param state
     * @param route
     */
    update_application_route (state, route) {
      state.application_route = route;
      sessionStorage.setItem('application_route', JSON.stringify(route));
    },

    update_loader_state (state, new_value) {
      state.ui.show_loader = new_value
    }
  },
  actions: {
    /**
     * Toggles the size of the navigation Menu
     * @param commit
     * @constructor
     */
    TOGGLE_NAVIGATION_SIZE ({commit}) {
      commit('toggle_navigation_size');
    },

    /**
     * Updates the current route in state
     * @param commit
     * @param route
     * @constructor
     */
    UPDATE_ROUTE ({commit}, route) {
      commit('update_application_route', route);
    },

    TOGGLE_LOADER ({commit}, new_value) {
      commit('update_loader_state', new_value);
    }
  },
  getters: {

    /**
     * Returns the size of the navigation menu
     * @param state
     * @returns {boolean}
     */
    getNavigationSize: state => {
      return state.ui.compact_navigation;
    },

    /**
     * Returns the loader state
     * (Shows a loader overlay over evrything except the menu)
     * @param state
     * @returns {boolean}
     */
    getLoaderState: state => {
      return state.ui.show_loader;
    },
    getLoaderTextState: state => {
      return state.ui.show_loader_text;
    }
  }
});
