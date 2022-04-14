/**
 * A collection of routes specific to users
 * @type {Array}
 */
export const users_routes = [
  {
    path: "create",
    name: "user-create",
    component: () => import(/* webpackChunkName: "user" */ '@/views/authenticated/users/UserCreate.vue')
  },
  {
    path: ":userid",
    name: "user-view",
    component: () => import(/* webpackChunkName: "user" */ '@/views/authenticated/users/UserCreate.vue')
  },
]
