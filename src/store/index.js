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
  },
  mutations: {
    toggle_navigation_size (state) {
      state.compact_navigation = !state.compact_navigation
    },

    update_application_route (state, route) {
      state.application_route = route;
      sessionStorage.setItem('application_route', JSON.stringify(route));
    }
  },
  actions: {
    TOGGLE_NAVIGATION_SIZE ({commit}) {
      commit('toggle_navigation_size');
    },

    UPDATE_ROUTE ({commit}, route) {
      commit('update_application_route', route);
    }
  },
  getters: {
    getNavigationSize: state => {
      return state.compact_navigation;
    }
  }
});
