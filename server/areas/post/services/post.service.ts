import PostModel from "../../../model/post.model";
import express from "express";
import IPost from "../../../interfaces/post.interface";
import PostViewModel from "../../../viewmodel/post.viewmodel";

export default class PostService {
  private _postdb: PostModel = new PostModel();

  async createPost(postData, userId: string, res: express.Response): Promise<boolean> {
    const newPost = await this._postdb.createPost(postData, userId);
    if (newPost === undefined) return false;
    return true;
  }

  async getPosts(userId: string): Promise<IPost[]> {
    let posts = await this._postdb.getPostsRecent(userId);

    for (let post of posts) {
      post = await PostViewModel.build(post);
    }
    return posts;
  }

  async getUserPosts(userId: string): Promise<IPost[]> {
    const posts = await this._postdb.getUserPosts(userId);

    for (let post of posts) {
      post = await PostViewModel.build(post);
    }
    return posts;
  }
}