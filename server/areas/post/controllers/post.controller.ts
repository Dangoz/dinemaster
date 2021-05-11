import IController from "../../../interfaces/controller.interface";
import express from "express";
import { ensureAuthenticated } from "../../../middlewares/authen.middleware";
import S3 from "../config/awsS3";
import PostService from "../services/post.service";

class PostController implements IController {
  public path = '/post';
  public router = express.Router();
  private postService: PostService = new PostService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, ensureAuthenticated, this.createPost);
    this.router.get('/s3url', this.createUrl);
  }

  private createPost = async (req: express.Request, res: express.Response) => {
    const postData = req.body;
    const status = await this.postService.createPost(postData, req.user.id, res);
    status
      ? res.status(200).json({ message: "post created" }) 
      : res.status(300).json({ error: "post not created" })
  }

  private createUrl = async (req: express.Request, res: express.Response) => {
    const uploadUrl = await S3.generateUploadUrl();
    res.status(200).json({ uploadUrl });
  }

}

export default PostController;