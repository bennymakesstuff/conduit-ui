/**
 * A collection of routes specific to users
 * @type {Array}
 */
export const user_routes = [
  {
    path: "profile-settings",
    name: "user_profilesettings",
    component: () => import(/* webpackChunkName: "user" */ '@/views/authenticated/user/SettingsProfile.vue')
  },
  {
    path: "utilities",
    name: "user_utilities",
    component: () => import(/* webpackChunkName: "user" */ '@/views/authenticated/user/Utilities.vue')
  },
]
