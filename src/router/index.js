// Import Vue Router
import { createWebHistory, createRouter } from 'vue-router'

// Import Route Files
import { user_routes } from './user_routes.js';
import store from '@/store';

const REDIRECT_PATH = '/';
const ERROR_COLOR = 'red';

/**
 * Application level routing
 * @type {Array}
 */
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "core" */ '@/views/authenticated/Home.vue'),
    meta: {
      color: 'blue',
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "core" */ '@/views/public/Root.vue')
  },
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
  { path: "/:pathMatch(.*)*", component: () => import(/* webpackChunkName: "core" */ '@/views/authenticated/Home.vue') }
];


export const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {

  let requires_auth = checkRouteRequiresAuthentication(to);
  let user_authenticated = checkUserLoggedIn();

  let route_color = to.meta.color ?? '#000000';

  if (to.path !== REDIRECT_PATH) {

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
        console.log("%cUser not authenticated. Redirecting to " + REDIRECT_PATH , "color: " + ERROR_COLOR + ";")
        next(REDIRECT_PATH);
      }
    }
    else {
      // Path does not require authentication
      next();
    }
  }
  else {
    next();
  }
})


/**
 * Checks that a user is currently logged in
 * @return {boolean}
 */
function checkUserLoggedIn()
{
  return (store.state.user !== null)
}

/**
 * Checks if a route requires authentication to login
 * @return {boolean}
 */
function checkRouteRequiresAuthentication(route, next)
{
  return (route.meta.requiresAuth && route.meta.requiresAuth === true);
}
