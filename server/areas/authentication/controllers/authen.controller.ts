import express from "express";
import IController from "../../../interfaces/controller.interface";
import { forwardAuthenticated, ensureAuthenticated } from "../../../middlewares/authen.middleware";
import passport from "passport";
import { AuthenticationService } from "../services/authen.service";
import IUser from "../../../interfaces/user.interface";

class AuthenticationController implements IController {
  public path = '/';
  public router = express.Router();

  constructor(public readonly service: AuthenticationService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/auth/register`, this.registration);
    this.router.post(`/auth/login`, this.login);
    this.router.get(`/user`, ensureAuthenticated, this.user);
    this.router.get('/auth/logout', this.logout);
  }

  // login as existing user;
  private login = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {

        return res.status(299).json({ err: "Invalid Credentials" });
      }
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        return res.status(200).json({ message: 'authenticated' });
      });
    })(req, res, next);
  };

  // register new user
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (await this.service.getUserByEmail(req.body.email)) {

      return res.status(299).json({ err: "Email Already Exists" });
    }
    await this.service.createUser(req.body);
    return res.status(200).json({ message: "user created" });
  };

  private user = async (req: express.Request, res: express.Response) => {

    const user: IUser = req.user;
    console.log(`profile return: ${JSON.stringify(user, null, 2)}`);
    res.status(200).json(user);
  }

  private logout = async (req: express.Request, res: express.Response) => {
    req.logOut();
    res.status(200).json({ message: 'logged out' });
  };
}

export default AuthenticationController;