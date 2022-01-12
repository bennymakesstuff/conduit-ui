// Import Vue Router
import { createWebHistory, createRouter } from 'vue-router'

import { unwrapProxy } from '@/helper';

// Import Route Files
import { user_routes } from './user_routes.js';
import { role_routes } from './role_routes.js';
import { app_settings_routes } from './app_settings_routes.js';
import store from '@/store';
import {$axios as $http} from "@/axios";
import {permission_routes} from "@/router/permission_routes";

const UNAUTHENTICATED_REDIRECT_PATH = '/';
const AUTHENTICATED_REDIRECT_PATH = '/account';
const ERROR_COLOR = 'red';




/**
 * Application level routing
 * @type {Array}
 */
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "core" */ '@/views/public/Root.vue'),
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import(/* webpackChunkName: "core" */ '@/views/public/Login.vue')
      },
      {
        path: "/register",
        name: "register",
        component: () => import(/* webpackChunkName: "core" */ '@/views/public/Register.vue')
      },
      {
        path: "/recover-account",
        name: "recover_account",
        component: () => import(/* webpackChunkName: "core" */ '@/views/public/Forgot.vue')
      },
      {
        path: "/password-reset",
        name: "password_reset",
        component: () => import(/* webpackChunkName: "core" */ '@/views/public/PasswordReset.vue')
      },
    ]
  },
  {
    path: "/account",
    name: "account",
    meta: {
      color: 'green',
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "core" */ '@/views/authenticated/Root.vue'),
    children: [
      {
      path: "/user",
      name: "user",
      component: () => import(/* webpackChunkName: "core" */ '@/views/authenticated/user/Root.vue'),
      meta: {
        color: 'green',
        requiresAuth: true,
      },
      children: user_routes
    },
    {
      path: "/app-settings",
      name: "app_settings",
      component: () => import(/* webpackChunkName: "core" */ '@/views/authenticated/settings/application_settings/Root.vue'),
      meta: {
        color: 'green',
        requiresAuth: true,
      },
      children: app_settings_routes
    },
    {
      path: "/roles",
      name: "roles",
      component: () => import(/* webpackChunkName: "core" */ '@/views/authenticated/roles/Root.vue'),
      meta: {
        color: 'green',
        requiresAuth: true,
      },
      children: role_routes
    },
    {
      path: "/permissions",
      name: "permissions",
      component: () => import(/* webpackChunkName: "core" */ '@/views/authenticated/permissions/Root.vue'),
      meta: {
        color: 'green',
        requiresAuth: true,
      },
      children: permission_routes
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import(/* webpackChunkName: "core" */ '@/views/authenticated/dashboard/Root.vue'),
      meta: {
        color: 'green',
        requiresAuth: true,
      },
    },
    ]
  },
  { path: "/:pathMatch(.*)*", component: () => import(/* webpackChunkName: "core" */ '@/views/authenticated/Home.vue') }
];


export const router = createRouter({
  history: createWebHistory(),
  routes
});


// Check if a user exists
async function checkUserState() {
  if (store.getters.getUser === null) {
    let user_credentials = JSON.parse(localStorage.getItem('credentials'));
    if (user_credentials !== null) {

      // Set axios bearer token and request user details
      await store.dispatch('SET_BEARER_TOKEN', user_credentials);
      let user_result = await store.dispatch('GET_USER_DETAILS', user_credentials['access_token']);

      // If details return true, set bearer
      if (user_result.status === true) {
        router.push({name: 'dashboard'});
      }
    }
  }
}

checkUserState();

/**
 * Adds before route change routing to application
 */
router.beforeEach((to, from, next) => {

  let requires_auth = checkRouteRequiresAuthentication(to);
  let user_authenticated = checkUserLoggedIn();

  let route_color = to.meta.color ?? '#000000';

  if (to.path !== UNAUTHENTICATED_REDIRECT_PATH) {

    //Check if path requires authentication
    if (requires_auth === true)
    {
      if (user_authenticated === true) {
        // User authenticated
        console.log("%cAuthentication Protected Route", "color: " + route_color + ";")
        next();
      }
      else{
        // User not authenticated
        console.log("%cUser not authenticated. Redirecting to " + UNAUTHENTICATED_REDIRECT_PATH , "color: " + ERROR_COLOR + ";")
        next(UNAUTHENTICATED_REDIRECT_PATH);
      }
    }
    else {
      // Path does not require authentication
      console.log("%cUser Authenticated", "color: " + route_color + ";")
      console.log("%cRedirecting to authenticated home", "color: " + route_color + ";")
      if (user_authenticated === true) {
        next(AUTHENTICATED_REDIRECT_PATH);
      }
      else {
        next();
      }
    }
  }
  else {
    next();
  }
})


router.afterEach((to, from, failure) => {
  // Update the route in the store for rehydration
  store.dispatch('UPDATE_ROUTE', to);
});

/**
 * Checks that a user is currently logged in
 * @return {boolean}
 */
function checkUserLoggedIn()
{
  return (store.getters.getUser != null);
}

/**
 * Checks if a route requires authentication to login
 * @return {boolean}
 */
function checkRouteRequiresAuthentication(route, next)
{
  return (route.meta.requiresAuth && route.meta.requiresAuth === true);
}
