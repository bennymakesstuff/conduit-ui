/**
 * A collection of routes specific to Roles
 * @type {Array}
 */
export const app_settings_routes = [
  {
    path: "basic",
    name: "app_settings_basic",
    component: () => import(/* webpackChunkName: "user" */ '@/views/authenticated/settings/application_settings/Basic.vue')
  },
  {
    path: "branding",
    name: "app_settings_branding",
    component: () => import(/* webpackChunkName: "user" */ '@/views/authenticated/settings/application_settings/Branding.vue')
  },
]
