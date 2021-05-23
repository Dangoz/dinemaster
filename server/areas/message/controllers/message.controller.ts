import IController from "../../../interfaces/controller.interface";
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
  }

  private getRoom = async (req: express.Request, res: express.Response) => {
    const { uid1, uid2 } = req.params;
    const room = await this.messageService.getRoom(uid1, uid2);
    res.status(200).json({ room });
  }
}

export default MessageController;