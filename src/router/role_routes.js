/**
 * A collection of routes specific to Roles
 * @type {Array}
 */
export const role_routes = [
  {
    path: "create",
    name: "role-create",
    component: () => import(/* webpackChunkName: "user" */ '@/views/authenticated/roles/RoleCreate.vue')
  },
  {
    path: "edit",
    name: "role-edit",
    component: () => import(/* webpackChunkName: "user" */ '@/views/authenticated/roles/RoleCreate.vue')
  },
]
