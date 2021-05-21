import IController from "../../../interfaces/controller.interface";
import IUser from "../../../interfaces/user.interface";
import express from "express";
import { ensureAuthenticated } from "../../../middlewares/authen.middleware";
import UserService from "../services/user.service";

class UserController implements IController {
  public path = '/user';
  public router = express.Router();
  private userService: UserService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/profile/:uid`, ensureAuthenticated, this.userProfile);
    this.router.put(`${this.path}/bio`, ensureAuthenticated, this.updateBio);
    this.router.put(`${this.path}/photo`, ensureAuthenticated, this.updatePhoto);
    this.router.post(`${this.path}/post/likeUnlike`, ensureAuthenticated, this.likeUnlike);
    this.router.post(`${this.path}/followUnfollow`, ensureAuthenticated, this.followUnfollow);
    this.router.get(`${this.path}/suggest-follow/:uid`, ensureAuthenticated, this.suggestFollow);
  }

  private userProfile = async (req: express.Request, res: express.Response) => {
    const user: IUser = await this.userService.getUserProfile(req.params.uid);
    res.status(200).json({ user });
  }

  private updateBio = async (req: express.Request, res: express.Response) => {
    const { id, bio } = req.body
    const status = await this.userService.updateBio(id, bio);
    status ? res.status(200).json({ message: "bio updated" }) : res.status(300).json({ err: "update failed" });
  }

  private updatePhoto = async (req: express.Request, res: express.Response) => {
    const { id, url } = req.body
    const status = await this.userService.updatePhoto(id, url);
    status ? res.status(200).json({ message: "photo updated" }) : res.status(300).json({ err: "update failed" });
  }

  private likeUnlike = async (req: express.Request, res: express.Response) => {
    const { userId, postId, likeToggle } = req.body;
    await this.userService.likeUnlike(userId, postId, likeToggle);
    res.status(200).json({ message: `${likeToggle ? 'like' : 'unlike'} a post` });
  }

  private followUnfollow = async (req: express.Request, res: express.Response) => {
    const { userId, hostId, followToggle } = req.body;
    console.log(`userId: ${userId}, hostId: ${hostId}`);
    const status = await this.userService.followUnfollow(userId, hostId, followToggle);
    status ? res.status(200).json({ message: `${followToggle ? `follow` : `unfollow`}ed a post` })
      : res.status(300).json({ err: `${followToggle ? `follow` : `unfollow`} failed` });
  }

  private suggestFollow = async (req: express.Request, res: express.Response) => {
    const users: IUser[] = await this.userService.suggestFollow(req.params.uid);
    res.status(200).json({ users }); 
  }
}

export default UserController;