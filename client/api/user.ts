import api from "../config/axios";

export default class User {

  static async updateBio(id, bio) {
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
}