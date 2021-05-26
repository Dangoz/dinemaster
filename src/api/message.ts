import api from "../config/axios";
import IUser from "../interface/user.interface";

export default class Message {

  static async getRoom(userId1: string, userId2: string): Promise<string> {
    const response = await api.get(`/message/room/${userId1}/${userId2}`,
      { withCredentials: true });

    console.log(JSON.stringify(response.data));
    return response.data.room;
  }

  static async generateDefaultSwiper(userId: string, followingIds: string[]): Promise<IUser[]> {
    const response = await api.post(`/message/default-swiper/${userId}`,
      { followingIds });
    return response.data.users;
  }

  static async searchUser(queryList: string[]): Promise<IUser[]> {
    const response = await api.post('/message/search', { queryList });
    return response.data.users;
  }
}