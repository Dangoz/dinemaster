import { User_Room } from "@prisma/client";
import prisma from "./prisma.client";

export default class User_RoomModel {

  async getRoomByTwoUsers(uid1: string, uid2: string): Promise<string | undefined> {
    const userRoom = await prisma.user_Room.findMany({
      where: {
        OR: [
          { userId: uid1 },
          { userId: uid2 }
        ]
      }
    })
    console.log(JSON.stringify(userRoom, null, 2));

    let cache = [];
    for (let room of userRoom) {
      if (cache.indexOf(room.roomId) !== -1) return room.roomId;
      cache.push(room.roomId);
    }
    return;
  }

  async createUserRoom(roomId: string, userIds: string[]): Promise<void> {
    const data = userIds.map(userId => { return { userId, roomId } });
    const result = await prisma.user_Room.createMany({
      data: [
        { roomId, userId: userIds[0] },
        { roomId, userId: userIds[1] }
      ]
    });
    console.log('result', result.count);
  }
}