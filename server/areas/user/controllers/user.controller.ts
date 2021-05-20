import IController from "../../../interfaces/controller.interface";
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
    this.router.put(`${this.path}/bio`, ensureAuthenticated, this.updateBio);
    this.router.put(`${this.path}/photo`, ensureAuthenticated, this.updatePhoto);
    this.router.post(`${this.path}/post/likeUnlike`, ensureAuthenticated, this.likeUnlike);
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
}

export default UserController;