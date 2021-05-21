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

    for (let i = 0; i < posts.length; i++) {
      posts[i] = await PostViewModel.build(posts[i]);
    }
    return posts;
  }

  async getUserPosts(userId: string): Promise<IPost[]> {
    let posts = await this._postdb.getUserPosts(userId);

    for (let i = 0; i < posts.length; i++) {
      posts[i] = await PostViewModel.build(posts[i]);
    }
    return posts;
  }
}