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
    compact_navigation: false,
    api: "http://localhost:8000/api/v1/",
  },
  mutations: {
    /**
     * Toggles the size of the navigation Menu
     * @param state
     */
    toggle_navigation_size (state) {
      state.compact_navigation = !state.compact_navigation
    },

    /**
     * Updates the current route in state
     * @param state
     * @param route
     */
    update_application_route (state, route) {
      state.application_route = route;
      sessionStorage.setItem('application_route', JSON.stringify(route));
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
    }
  },
  getters: {
    /**
     * Returns the size of the navigation menu
     * @param state
     * @returns {boolean}
     */
    getNavigationSize: state => {
      return state.compact_navigation;
    }
  }
});
