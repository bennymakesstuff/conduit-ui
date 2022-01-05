import { router } from '@/router';
import { $axios as $http } from '@/axios'

export const user = {
  state: {
    application_user: null,
    credentials: null,
    recovery_email: null,
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
    },

    test_login (state) {
      state.application_user = "benjamin";
    },

    /**
     * Sets the bearer token on local storage and state
     * @param state
     * @param data
     */
    set_bearer (state, data) {
      state.credentials = data;
      localStorage.setItem('credentials', JSON.stringify(data));
      $http.defaults.headers.common["Authorization"] = "Bearer " + data['access_token'];
    },

    /**
     * Logs the user out and removes all tokens
     * @param state
     */
    logout_user (state) {
      state.application_user = null;
      state.credentials = null;
      localStorage.removeItem('credentials');
      $http.defaults.headers.common["Authorization"] = null;
      router.push({name: 'home'});
    },

    start_recovery_mode (state, email) {
      state.recovery_email = email;
    },

    stop_recovery_mode (state) {
      state.recovery_email = null;
    },

  },

  // Actions
  actions: {
    SET_BEARER_TOKEN ({commit}, credentials) {
      commit('set_bearer', credentials);
    },

    async LOGIN_USER ({dispatch, commit}, user) {
        console.log('%cAttempting to Login User', "color:green");
        commit('stop_recovery_mode');

        // Function to login user
        try {
          let response = await $http.post('http://localhost:8000/api/v1/login', user);
          let data = response.data;

          // Check status of login response
          if (data.status === false) {
            console.log('%cCould not login user', "color:red");
            console.log('%cMessage: %c' + data.message, "color:red", "color:black");
            return { status: false };
          }

          // Login the user and set the bearer
          commit('set_bearer', data);
          console.log('Axios_Token:' + $http.defaults.headers.common["Authorization"]);

          // Get the user details with the new bearer token
          let user_details = await dispatch('GET_USER_DETAILS');

          if (user_details.status === true) {
            return { status: true };
          }
          else {
            return { status: false };
          }

        }
        catch (error) {
          console.log('%cCould not login user', "color:red");
          console.log(error);
          return { status: false };
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
     */
    async GET_USER_DETAILS ({commit}) {
      console.log('%cRetrieving user details', "color:green");

      // Function to get users details
      try {
        let response = await $http.get('http://localhost:8000/api/v1/user/details', user);
        let data = response.data;

        // Check status of login response
        if (data.status === false) {
          console.log('%cCould not get user details', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
          return { status: false };
        }

        // Move to the logged in page
        commit('login_user', data);
        return { status: true }
      }
      catch (error) {
        console.log('%cCould not get user details', "color:red");
        console.log(error);
        return { status: false };
      }

    },


    async REGISTER ({dispatch, commit}, user) {
      console.log('%cAttempting to Register a new user', "color:green");

      // Function to register user
      try {
        let response = await $http.post('http://localhost:8000/api/v1/register', user);
        let data = response.data;

        // Check status of login response
        if (data.status === false) {
          console.log('%cCould not register user', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
          return false;
        }

        return true;
      }
      catch (error) {
        console.log('%cCould not login user', "color:red");
        console.log(error);
        return false;
      }
    },

    async REQUEST_PASSWORD_RESET ({dispatch, commit}, user) {
      console.log('%cRequesting Password Reset Link', "color:green");

      try {
        let response = await $http.post('http://localhost:8000/api/v1/recover-account', user);
        let data = response.data;

        // Check status of login response
        if (data.status === false) {
          console.log('%cPassword reset request failed', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
          commit('stop_recovery_mode');
          return { status: false };
        }

        commit('start_recovery_mode', user.email);
        return { status: true };
      }
      catch (error) {
        console.log('%cPassword reset request failed', "color:red");
        console.log(error);
        commit('stop_recovery_mode');
        return { status: false };
      }
    },

    async RESET_PASSWORD ({dispatch, commit}, user) {
      console.log('%cResetting Password', "color:green");

      try {
        let response = await $http.post('http://localhost:8000/api/v1/reset-password', user);
        let data = response.data;

        // Check status of login response
        if (data.status === false) {
          console.log('%cPassword reset failed', "color:red");
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
          commit('stop_recovery_mode');
          return { status: false };
        }

        commit('start_recovery_mode', user.email);
        return { status: true };
      }
      catch (error) {
        console.log('%cPassword reset failed', "color:red");
        console.log(error);
        commit('stop_recovery_mode');
        return { status: false };
      }
    },


    async TOKEN_LOGIN ({dispatch, commit}, application_credentials) {
      try {
        // Reset the bearer token
        $http.defaults.headers.common["Authorization"] = "Bearer " + application_credentials['access_token'];

        let response = await $http.post('http://localhost:8000/api/v1/token-login', user);
        let data = response.data;

        // Check status of login response
        if (data.status === false) {
          console.log('%cToken Login Failed', "color:red");
          // Remove the token from session storage
          console.log('%cMessage: %c' + data.message, "color:red", "color:black");
          return { status: false };
        }

        return { status: true };
      }
      catch (error) {
        console.log('%cToken Login Failed', "color:red");
        // Remove the token from session storage
        console.log(error);
        return { status: false };
      }
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
    },

    getRecoveryEmail: state => {
      return state.recovery_email;
    }


  }
}
