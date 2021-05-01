import express from "express";
import path from "path";
import session from "express-session";
// import morgan from "morgan";


const MemoryStore = require('memorystore')(session);

module.exports = (app, nextApp) => {
  // Static File Serving and Post Body Parsing
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));


  // Session Configuration
  app.use(
    session({
      store: new MemoryStore(),
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
