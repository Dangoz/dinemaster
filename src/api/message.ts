import api from "../config/axios";

export default class Message {

  static async getRoom(userId1: string, userId2: string): Promise<string> {
    const response = await api.get(`/message/room/${userId1}/${userId2}`,
      { withCredentials: true });

    console.log(JSON.stringify(response.data));
    return response.data.room;
  }
}