import { Room } from "@prisma/client";
import prisma from "./prisma.client";

export default class RoomModel {

  async createRoom(): Promise<Room> {
    const room = await prisma.room.create({
      data: {}
    })
    return room;
  }
}