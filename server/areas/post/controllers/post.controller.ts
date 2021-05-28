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
    this.router.get(`${this.path}/get/:pid`, ensureAuthenticated, this.getPostById);
    this.router.get(`${this.path}/home/:uid`, ensureAuthenticated, this.getPosts);
    this.router.get(`${this.path}/user/:uid/:hid`, ensureAuthenticated, this.getUserPosts);
    this.router.get(`${this.path}/user-likes/:uid/:hid`, ensureAuthenticated, this.getUserLikes);
    this.router.post(`${this.path}/create`, ensureAuthenticated, this.createPost);
    this.router.post(`${this.path}/tags/`, ensureAuthenticated, this.getPostsByTags);
    this.router.get('/s3url', ensureAuthenticated, this.createUrl);
  }

  private createPost = async (req: express.Request, res: express.Response) => {
    const postData = req.body;
    const status = await this.postService.createPost(postData, req.user.id);
    status
      ? res.status(200).json({ message: "post created" })
      : res.status(300).json({ error: "post not created" })
  }

  private getPostById = async (req: express.Request, res: express.Response) => {
    const { pid } = req.params;
    const post: IPost = await this.postService.getPostById(pid, req.user.id);
    res.status(200).json({ post });
  }

  private createUrl = async (req: express.Request, res: express.Response) => {
    console.log("GETTING URL")
    const uploadUrl = await S3.generateUploadUrl();
    res.status(200).json({ uploadUrl });
  }

  private getPosts = async (req: express.Request, res: express.Response) => {
    const size = parseInt(req.query.size.toString());
    const limit = parseInt(req.query.limit.toString());
    const posts: IPost[] = await this.postService.getPosts(req.params.uid, size, limit);
    res.status(200).json({ posts })
  }

  private getUserPosts = async (req: express.Request, res: express.Response) => {
    const { uid, hid } = req.params;
    const posts: IPost[] = await this.postService.getUserPosts(uid, hid);
    res.status(200).json({ posts });
  }

  private getUserLikes = async (req: express.Request, res: express.Response) => {
    const { uid, hid } = req.params;
    const posts: IPost[] = await this.postService.getUserLikes(uid, hid);
    res.status(200).json({ posts });
  }

  private getPostsByTags = async (req: express.Request, res: express.Response) => {
    const { tags, pid } = req.body;
    const posts: IPost[] = await this.postService.getPostsByTags(tags, req.user.id, pid);

    res.status(200).json({ posts });
  }
}

export default PostController;