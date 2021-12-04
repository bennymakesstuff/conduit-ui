import { router } from '@/router';

import { unwrapProxy } from '@/helper';

export const user = {
  state: {
    application_user: null
  },

  // Mutations
  mutations: {
    login_user (state, user) {
      state.application_user = user;
      router.push({name: 'user'});
    },

    logout_user (state, user) {
      state.application_user = user;
      router.push({name: 'home'});
    }
  },

  // Actions
  actions: {
    LOGIN_USER ({commit, state}) {
      let user = {
        username: 'chelseabroad',
        given_name: 'Chelsea',
        surname: 'Broad',
        email: 'chelsea@benbroad.com'
      }

      return new Promise((resolve, reject) => {
        commit('login_user', user);
        console.log("%cUser Logged In", "color: green;");
      });
    },

    LOGOUT_USER ({commit, state}) {
      return new Promise((resolve, reject) => {
        commit('logout_user');
        console.log("%cUser Logged Out", "color: red;");
      });
    }
  },

  // Getters
  getters: {

    /**
     * Return the Application User
     * @param  {[type]} state               [description]
     * @return {[type]}       [description]
     */
    getUser: state => {
      return state.application_user;
    }


  }
}
