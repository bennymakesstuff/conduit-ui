import { createStore, install } from 'vuex'

import { unwrapProxy } from '@/helper';

// Import Vuex Modules
import { user } from './user.js'

export default createStore({
  modules: {
    user
  },
  state: {
    application_route: '/'
  },
  mutations: {
    update_application_route (state, route) {
      state.application_route = route;
    }
  },
  actions: {
    UPDATE_ROUTE ({commit}, route) {
      commit('update_application_route', route);
    }
  },
  getters: {

  }
});
