import api from "../config/axios";
import IUser from "../interface/user.interface"
import { GetServerSidePropsContext } from "next";

export default class User {

  static async getUser(ctx: GetServerSidePropsContext, id: string): Promise<IUser> {
    const response = await api.get(
      `/user/profile/${id}`, 
     { headers: ctx.req.headers.cookie ? { cookie: ctx.req.headers.cookie } : undefined});
    return response.data.user;
  }

  static async updateBio(id, bio): Promise<void> {
    const data = { id, bio };
    const response = await api.put('/user/bio', data);
  }

  static async updatePhoto(id: string, file): Promise<string> {
    // get upload url from server
    console.log("getting url")
    const uploadUrl = (await api.get('/s3url')).data.uploadUrl;

    // upload image to s3
    console.log("uploading image")
    const { config: { url } } = await api.put(
      uploadUrl,
      file,
      { headers: { "Content-Type": "multipart/form-data" } }
    )

    const fileUrl = url.split('?')[0];
    const data = { id, url: fileUrl }
    api.put('/user/photo', data);
    return fileUrl
  }

  // like or unlike a post
  static async likeUnlikePost(userId: string, postId: string, likeToggle: boolean): Promise<void> {
    
    const data = { userId, postId, likeToggle };
    const likeUrl = `/user/post/likeUnlike`;
    const response = await api.post(likeUrl, data);
    // return response; 
  }

  static async followUnfollowUser(userId: string, hostId: string, followToggle: boolean): Promise<number> {
    const data = { userId, hostId, followToggle };
    const followUrl = `/user/followUnfollow`;
    const response = await api.post(followUrl, data);
    return response.status;
  }

  static async suggestUser(userId: string): Promise<IUser[]> {
    const response = await api.get(`/user/suggest-follow/${userId}`);
    return response.data.users;
  } 
}