import express from "express";
import IController from "../../../interfaces/controller.interface";
import { forwardAuthenticated, ensureAuthenticated } from "../../../middlewares/authen.middleware";
import passport from "passport";
import { AuthenticationService } from "../services/authen.service";
import nextApp from "../../../config/next.app";
import IUser from "../../../interfaces/user.interface";

class AuthenticationController implements IController {
  public path = '/';
  public router = express.Router();

  constructor(public readonly service: AuthenticationService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', forwardAuthenticated, this.showLandingPage);
    this.router.post(`/register`, this.registration);
    this.router.post(`/login`, this.login);
    this.router.get(`/user`, ensureAuthenticated, this.userProfile);
  }

  private showLandingPage = (req: express.Request, res: express.Response) => {
    console.log('showing landing page');
    return nextApp.render(req, res, '/passport/landing')
  };

  // login as existing user;
  private login = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        
        return res.redirect("/"); 
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect("/home");
      });
    })(req, res, next);
  };

  // register new user
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (await this.service.findUserByEmail(req.body.email)) {

      nextApp.render(req, res, '/passport/signup')
      return;
    }
    
    this.service.createUser(req.body);
    nextApp.render(req, res, '/passport/signin')
  };

  private userProfile = async (req: express.Request, res: express.Response) => {
    
    console.log(`profile return! ${req.user.username}`);
    const user = req.user;
    res.status(200).json(user);
  }

}

export default AuthenticationController;