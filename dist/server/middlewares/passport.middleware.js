"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_config_1 = __importDefault(require("../areas/authentication/config/passport.config"));
var authen_service_1 = require("../areas/authentication/services/authen.service");
module.exports = function (app) {
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    // passport configurations
    var passportConfig = new passport_config_1.default(new authen_service_1.AuthenticationService());
};
