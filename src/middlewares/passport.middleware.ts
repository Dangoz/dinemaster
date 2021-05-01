import passport from "passport";
import PassportConfig from "../areas/authentication/config/passport.config";
import { AuthenticationService } from "../areas/authentication/services/authen.service";

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // passport configurations
  const passportConfig = new PassportConfig(new AuthenticationService());
};