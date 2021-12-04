// Import Vue Router
import { createWebHistory, createRouter } from 'vue-router'

import { unwrapProxy } from '@/helper';

// Import Route Files
import { user_routes } from './user_routes.js';
import store from '@/store';

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
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "core" */ '@/views/public/Root.vue')
  },
  {
    path: "/account",
    name: "account",
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
  store.dispatch('UPDATE_ROUTE', to.name);
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
