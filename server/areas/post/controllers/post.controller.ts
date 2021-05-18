import IController from "../../../interfaces/controller.interface";
import express from "express";
import { ensureAuthenticated } from "../../../middlewares/authen.middleware";
import S3 from "../config/awsS3";
import PostService from "../services/post.service";
import IPost from "../../../interfaces/post.interface";

class PostController implements IController {
  public path = '/post';
  public router = express.Router();
  private postService: PostService = new PostService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/home`, ensureAuthenticated, this.getPosts);
    this.router.get(`${this.path}/user`, ensureAuthenticated, this.getUserPosts);
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
    try {
      console.log("GETTING URL")
      const uploadUrl = await S3.generateUploadUrl();
      res.status(200).json({ uploadUrl });
    } catch (err) {
      console.log(err);
    }
  }

  private getPosts = async (req: express.Request, res: express.Response) => {
    // const userId: string = req.query.id.toString();
    const posts: IPost[] = await this.postService.getPosts(req.user.id);
    console.log(`posts: ${posts[0].message}`)
    res.status(200).json({ posts })
  }

  private getUserPosts = async (req: express.Request, res: express.Response) => {
    // const userId: string = req.query.id.toString();
    const posts: IPost[] = await this.postService.getUserPosts(req.user.id)
    res.status(200).json({ posts });
  }

}

export default PostController;