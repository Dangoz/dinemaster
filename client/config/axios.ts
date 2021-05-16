import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";

const baseUrl: string = process.env.NODE_ENV ===
  "production" ? 'http://localhost:5000' : 'http://localhost:5000';
  // 'https://dine-master.herokuapp.com' : 'http://localhost:5000';

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  },
})

// axiosCookieJarSupport(api);
// api.defaults.withCredentials = true;
// api.defaults.jar = new tough.CookieJar();

export default api;