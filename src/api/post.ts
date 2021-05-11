import IPost from "../interface/post.interface";
import IUser from "../interface/user.interface"
import api from "../config/axios";
import { FormEvent } from "react";
import { url } from "node:inspector";

export default class Post {

  static async createImagePost(event: FormEvent<HTMLFormElement>, user: IUser) {
    event.preventDefault();

    // get upload url from server
    console.log("getting url")
    const uploadUrl = (await api.get('/s3url')).data.uploadUrl;

    // upload image to s3
    console.log("uploading image")
    const { config: { url } } = await api.put(
      uploadUrl,
      event.target[1].files[0],
      { headers: { "Content-Type": "multipart/form-data" } }
    )

    // make create post request to server
    console.log("creating post")
    await api.post('/post/create', {
      message: event.target[0].value,
      source: url.split('?')[0],
      userId: user.id
    });

    // @ts-ignore reset form 
    event.target.reset();
  }
}