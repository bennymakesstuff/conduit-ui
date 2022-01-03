import { router } from '@/router';
import { $axios as $http } from '@/axios'
import { unwrapProxy } from '@/helper';
import axios from "axios";

export const user = {
  state: {
    application_user: null,
    credentials: null
  },

  // Mutations
  mutations: {
    /**
     * Adds the User to State and moves to the user home page
     * @param state
     * @param user
     */
    login_user (state, user) {
      state.application_user = user;
      router.push({name: 'user'});
    },

    /**
     * Sets the bearer token on local storage and state
     * @param state
     * @param data
     */
    set_bearer (state, data) {
      state.credentials = data;
      localStorage.setItem('credentials', data);
      $http.defaults.headers.common["Authorization"] = "Bearer " + data['access_token'];
      console.log(data['access_token']);
    },

    /**
     * Logs the user out and removes all tokens
     * @param state
     */
    logout_user (state) {
      state.application_user = null;
      localStorage.removeItem('credentials');
      $http.defaults.headers.common["Authorization"] = null;
      router.push({name: 'home'});
    }
  },

  // Actions
  actions: {
    async LOGIN_USER ({dispatch, commit}, user) {
        console.log('%cAttempting to Login User', "color:green");

        // Function to login user
        try {
          console.log('%cSending request', "color:green");
          let response = await $http.post('http://localhost:8000/api/v1/login', user);
          let data = response.data;
          console.log(response);

          // Check status of login response
          if (data.status === false) {
            console.log('%cCould not login user', "color:red");
            console.log('%cMessage: %c' + data.message, "color:red", "color:black");
            return false;
          }

          // Login the user and set the bearer
          commit('set_bearer', data);
          console.log('Axios_Token:' + $http.defaults.headers.common["Authorization"]);
          // Get the user details with the new bearer token
          dispatch('GET_USER_DETAILS');

        }
        catch (error) {
          console.log('%cCould not login user', "color:red");
          console.log(error);
        }

    },

    /**
     * Logs the user out
     * @param commit
     * @constructor
     */
    LOGOUT_USER ({commit}) {
        commit('logout_user');
    },

    /**
     * Retrieves the users details and saves them to state
     * @param commit
     * @returns {Promise<boolean>}
     * @constructor
     */
    async GET_USER_DETAILS ({commit}) {
      console.log('%cRetrieving user details', "color:green");

      // Function to get users details
      try {
        console.log('%cSending request', "color:green");
        let response = await $http.get('http://localhost:8000/api/v1/user/details', user);
        let data = response.data;
        console.log(response);

        // Check status of login response
        if (data.status === false) {
          console.log('%cCould not get user details', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
          return false;
        }

        // Move to the logged in page
        commit('login_user', data);
      }
      catch (error) {
        console.log('%cCould not get user details', "color:red");
        console.log(error);
      }

    },
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
