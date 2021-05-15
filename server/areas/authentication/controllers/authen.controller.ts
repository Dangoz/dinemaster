import express from "express";
import IController from "../../../interfaces/controller.interface";
import { forwardAuthenticated, ensureAuthenticated } from "../../../middlewares/authen.middleware";
import passport from "passport";
import { AuthenticationService } from "../services/authen.service";
import IUser from "../../../interfaces/user.interface";
import cors from "cors";

class AuthenticationController implements IController {
  public path = '/';
  public router = express.Router();

  constructor(public readonly service: AuthenticationService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get('/', this.showLandingPage);
    this.router.post(`/auth/register`, this.registration);
    this.router.post(`/auth/login`, this.login);
    this.router.get(`/user`, ensureAuthenticated, this.userProfile);
  }

  // private showLandingPage = (req: express.Request, res: express.Response) => {
  //   console.log('showing landing page');
  //   res.status(200).json({ message: "you have arrived at the default page" });
  // };

  // login as existing user;
  private login = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        
        res.status(299).json({ err: "invalid credentials" });
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        res.status(200).json({ message: 'authenticated' });
      });
    })(req, res, next);
  };

  // register new user
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (await this.service.findUserByEmail(req.body.email)) {

      return res.status(299).json({ err: "email already exists" });
    }
    await this.service.createUser(req.body);
    return res.status(200).json({ message: "user created" });
  };

  private userProfile = async (req: express.Request, res: express.Response) => {
    
    console.log(`profile return! ${req.user.username}`);
    const user = req.user;
    res.status(200).json(user);
  }

}

export default AuthenticationController;