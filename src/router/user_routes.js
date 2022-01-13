/**
 * A collection of routes specific to users
 * @type {Array}
 */
export const user_routes = [
  {
    path: "account/profile-settings",
    name: "user_profilesettings",
    component: () => import(/* webpackChunkName: "user" */ '@/views/authenticated/user/SettingsProfile.vue')
  },
  {
    path: "account/utilities",
    name: "user_utilities",
    component: () => import(/* webpackChunkName: "user" */ '@/views/authenticated/user/Utilities.vue')
  },
]
