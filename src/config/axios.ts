import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";
import baseUrl from "./baseUrl";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

// axiosCookieJarSupport(api);
// api.defaults.withCredentials = true;
// api.defaults.jar = new tough.CookieJar();

export default api;