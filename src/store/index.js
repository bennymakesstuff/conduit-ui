import { createStore, install } from 'vuex'

// Import Vuex Modules
import { user } from './user.js'

export default createStore({
  modules: {
    user
  },
  state: {
    username: 'bennybroad',
    given_name: 'Benjamin',
    surname: 'Broad',
    email: 'me@benbroad.com'
  }
});

//export function install;
