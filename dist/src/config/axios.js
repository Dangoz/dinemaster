"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var baseUrl = process.env.NODE_ENV ===
    "production" ? 'https://dine-master.herokuapp.com' : 'http://localhost:3000';
var api = axios_1.default.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
});
// axiosCookieJarSupport(api);
// api.defaults.withCredentials = true;
// api.defaults.jar = new tough.CookieJar();
exports.default = api;
