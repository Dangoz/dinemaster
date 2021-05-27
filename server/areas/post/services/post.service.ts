import PostModel from "../../../model/post.model";
import TagModel from "../../../model/tag.model";
import Post_TagModel from "../../../model/post_tag.model";
import express from "express";
import IPost from "../../../interfaces/post.interface";
import PostViewModel from "../../../viewmodel/post.viewmodel";

export default class PostService {
  private _postdb: PostModel = new PostModel();
  private _tagdb: TagModel = new TagModel();
  private _post_tagdb: Post_TagModel = new Post_TagModel();

  async createPost(postData, userId: string): Promise<boolean> {
    const newPost = await this._postdb.createPost(postData, userId);
    
    const tags = await this._tagdb.getOrCreateTagsByNames(postData.tags);
    const tagIds = tags.map(tag => tag.id);
    await this._post_tagdb.tagsToPost(newPost.id, tagIds);

    if (newPost === undefined) return false;
    return true;
  }

  async getPosts(userId: string, size: number, limit: number): Promise<IPost[]> {
    let posts = await this._postdb.getPostsRecent(userId, size, limit);

    for (let i = 0; i < posts.length; i++) {
      posts[i] = await PostViewModel.build(posts[i]);
    }
    return posts;
  }

  async getUserPosts(userId: string, hostId: string): Promise<IPost[]> {
    let posts = await this._postdb.getUserPosts(userId, hostId);

    for (let i = 0; i < posts.length; i++) {
      posts[i] = await PostViewModel.build(posts[i]);
    }
    return posts;
  }

  async getUserLikes(userId: string, hostId: string): Promise<IPost[]> {
    let posts = await this._postdb.getPostsLikedByUser(userId, hostId);
    posts.sort((a, b) => {
      return new Date(b.likesList[0].createdAt).getTime() - new Date(a.likesList[0].createdAt).getTime();
    })

    const options = userId == hostId ? {} : { likedByHost: true }
    for (let i = 0; i < posts.length; i++) {
      posts[i] = await PostViewModel.build(posts[i], options);
      // posts[i] = await PostViewModel.build(posts[i]);
    }
    return posts;
  }
}