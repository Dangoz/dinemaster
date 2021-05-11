import express from "express";
import path from "path";
import session from "express-session";
import cors from "cors";
import Redis from "ioredis";


const MemoryStore = require('memorystore')(session);

module.exports = (app, nextApp) => {
  // Static File Serving and Post Body Parsing
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // app.use(function(req, res, next) {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  //   res.header('Access-Control-Allow-Credentials', true);
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //   next();
  // })
  // app.use(cors());


  // Session Configuration
  const redis = new Redis(process.env.REDIS_URL);
  const RedisStore = require("connect-redis")(session);
  const MemoryStore = require('memorystore')(session);

  app.use(
    session({
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
    })
  );
};
