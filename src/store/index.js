import { createStore, install } from 'vuex'

// Import Vuex Modules
import { user } from './user.js'

export default createStore({
  modules: {
    user
  },
  state: {
  }
});
