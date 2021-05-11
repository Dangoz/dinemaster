import PostModel from "../../../model/post.model";
import express from "express";

export default class PostService {
  private _postdb: PostModel = new PostModel();

  async createPost(postData, userId: string, res: express.Response): Promise<boolean> {
    const newPost = await this._postdb.createPost(postData, userId);
    if (newPost === undefined) return false;
    return true;
  }
}