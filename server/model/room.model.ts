import { PrismaClient, Room } from "@prisma/client";

export default class RoomModel {
  private _prisma: PrismaClient = new PrismaClient();

  async createRoom(): Promise<Room> {
    const room = await this._prisma.room.create({
      data: {}
    })
    return room;
  }
}