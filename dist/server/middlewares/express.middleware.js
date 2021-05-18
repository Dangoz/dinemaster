"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var express_session_1 = __importDefault(require("express-session"));
var ioredis_1 = __importDefault(require("ioredis"));
var MemoryStore = require('memorystore')(express_session_1.default);
module.exports = function (app, nextApp) {
    // Static File Serving and Post Body Parsing
    app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    // app.use(function(req, res, next) {
    //   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    //   res.header('Access-Control-Allow-Credentials', true);
    //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //   next();
    // })
    // app.use(cors());
    // Session Configuration
    var redis = new ioredis_1.default(process.env.REDIS_URL);
    var RedisStore = require("connect-redis")(express_session_1.default);
    var MemoryStore = require('memorystore')(express_session_1.default);
    app.use(express_session_1.default({
        store: process.env.NODE_ENV === 'production'
            ? new RedisStore({ client: redis })
            : new RedisStore({ client: redis }),
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
    }));
};
