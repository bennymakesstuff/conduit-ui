import axios from "axios";

axios.defaults.baseURL = (process.env.APP_DEVELOPMENT_MODE === "true") ? process.env.DEV_API : process.env.BASE_URL;
axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "application/json";

export const $axios = axios.create();