import IPost from "../interface/post.interface";
import IUser from "../interface/user.interface"
import api from "../config/axios";
import { FormEvent } from "react";

export default class Post {

  /**
   * create Image post
   * @param event 
   * @param user 
   */
  static async createImagePost(data, user: IUser) {

    // get upload url from server
    console.log("getting url")
    const response = await api.get('/s3url')
    const uploadUrl = response.data.uploadUrl;

    // upload image to s3
    console.log("uploading image")
    const { config: { url } } = await api.put(
      uploadUrl,
      data.file,
      { headers: { "Content-Type": "multipart/form-data" } }
    )

    // make create post request to server
    console.log("creating post")
    await api.post('/post/create', {
      message: data.caption,
      source: url.split('?')[0],
      userId: user.id,
      tags: data.tags
    });
  }

  /**
   * get a user's posts
   * @param id 
   * @returns 
   */
  static async getUserPosts(id: string): Promise<IPost[]> {
    const response = await api({
      method: 'get',
      url: `/post/user/${id}`,
      withCredentials: true
    });
    const posts = response.data.posts;
 
    return posts;
  }

  /**
   * get home page posts for a user
   */
   static async getPosts(id: string): Promise<IPost[]> {
    const response = await api({
      method: 'get',
      url: `/post/home/${id}`,
      withCredentials: true
    });
    const posts = response.data.posts;
 
    return posts;
  }

  
}