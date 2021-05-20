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
    this.router.get(`/user`, ensureAuthenticated, this.userProfile);
  }

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
    if (await this.service.getUserByEmail(req.body.email)) {

      return res.status(299).json({ err: "email already exists" });
    }
    await this.service.createUser(req.body);
    return res.status(200).json({ message: "user created" });
  };

  private userProfile = async (req: express.Request, res: express.Response) => {
    
    const user: IUser = req.user;
    console.log(`profile return: ${JSON.stringify(user, null, 2)}`);
    res.status(200).json(user);
  }

}

export default AuthenticationController;