import IController from "../../../interfaces/controller.interface";
import IUser from "../../../interfaces/user.interface";
import express from "express";
import { ensureAuthenticated } from "../../../middlewares/authen.middleware";
import MessageService from "../services/message.service";


class MessageController implements IController {
  public path = '/message';
  public router = express.Router();
  private messageService: MessageService = new MessageService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/room/:uid1/:uid2`, ensureAuthenticated, this.getRoom);
    this.router.post(`${this.path}/default-swiper/:uid`, ensureAuthenticated, this.generateDefaultSwiper);
    this.router.post(`${this.path}/search`, ensureAuthenticated, this.searchUser);
    this.router.get(`${this.path}/recent-chats/:uid`, ensureAuthenticated, this.recentChats);
  }

  private getRoom = async (req: express.Request, res: express.Response) => {
    const { uid1, uid2 } = req.params;
    const room = await this.messageService.getRoom(uid1, uid2);
    res.status(200).json({ room });
  }

  private generateDefaultSwiper = async (req: express.Request, res: express.Response) => {
    const { followingIds } = req.body;
    console.log("followingIds", followingIds);
    const users: IUser[] = await this.messageService.defaultSwiperUsers(req.params.uid, followingIds);
    res.status(200).json({ users });
  }

  private searchUser = async (req: express.Request, res: express.Response) => {
    const queryList: string[] = req.body.queryList;
    const users: IUser[] = await this.messageService.searchUser(queryList);
    res.status(200).json({ users });
  }

  private recentChats = async (req: express.Request, res: express.Response) => {
    const chats: IUser[] = await this.messageService.getRecentChats(req.params.uid);
    res.status(200).json({ chats })
  }
}

export default MessageController;