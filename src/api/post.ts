import IPost from "../interface/post.interface";
import IUser from "../interface/user.interface"
import api from "../config/axios";
import { RepeatOneSharp } from "@material-ui/icons";

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
  static async getUserPosts(userId: string, hostId: string): Promise<IPost[]> {
    const response = await api({
      method: 'get',
      url: `/post/user/${userId}/${hostId}`,
      withCredentials: true
    });
    return response.data.posts;
  }

  static async getUserLikes(userId: string, hostId: string): Promise<IPost[]> {
    const response = await api({
      method: 'get',
      url: `/post/user-likes/${userId}/${hostId}`,
      withCredentials: true
    });
    return response.data.posts;
  }

  /**
   * get home page posts for a user
   */
   static async getPosts(id: string, size: number, limit: number): Promise<IPost[]> {
    const response = await api({
      method: 'get',
      url: `/post/home/${id}?size=${size}&limit=${limit}`,
      withCredentials: true
    });
    const posts = response.data.posts;
 
    return posts;
  }

  
}