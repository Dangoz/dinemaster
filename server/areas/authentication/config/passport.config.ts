import { AuthenticationService } from "../services/authen.service";
import passportLocal from "passport-local";
import passport from "passport";

// passport configurations
export default class PassportConfig {
  
  constructor(private readonly authenService: AuthenticationService) {
    this.authenService = authenService;
    passport.serializeUser(this.serialize())
    passport.deserializeUser(this.deserialize());
    passport.use(this.localLogin());
  }
  
  // return local strategy configurations
  private localLogin(): passportLocal.Strategy {
    return new passportLocal.Strategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, done) => {
        const user = await this.authenService.getUserByEmailAndPassword(email, password);
        return user
          ? done(null, user)
          : done(null, false, {
              message: "Invalid credentials provided, email or password error",
            });
      }
    );
  }

  // return config function for passport.serialize()
  private serialize(): (user: any, done) => void {
    return (user: any, done): void => {
      done(null, user.email);
    }
  }

  // return config function for passport.deserailize()
  private deserialize(): (email: string, done) => Promise<void> {
    return async (email: string, done): Promise<void> => {
      let user =  await this.authenService.findUserByEmail(email);
      user ? done(null, user) : done({ message: "User not found" }, null);
    }
  }
}