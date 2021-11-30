// Import Vue Router
import { createWebHistory, createRouter } from 'vue-router'

// Import Route Files
import { user_routes } from './user_routes.js';


/**
 * Application level routing
 * @type {Array}
 */
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "core" */ '@/views/authenticated/Home.vue')
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
    children: user_routes
  },
  { path: "/:pathMatch(.*)*", component: () => import(/* webpackChunkName: "core" */ '@/views/authenticated/Home.vue') }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
