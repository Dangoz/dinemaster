import prisma from "./prisma.client";
import { Message, User } from "@prisma/client";

export default class MessageModel {

  async createMessage(message: string, userId: string, roomId: string, createdAt: Date): Promise<Message> {
    const newMessage = await prisma.message.create({
      data: {
        message,
        userId,
        roomId,
        createdAt
      }
    });
    return newMessage;
  }

  async getMessagesByRoom(roomId: string): Promise<Message[]> {
    const messages = await prisma.message.findMany({
      where: {
        roomId
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
    return messages;
  }

  async mostRecentMessageByRoom(roomIds: string[], userId: string): Promise<(Message & { User: User; })[]> {
    const messages = await prisma.message.findMany({
      where: {
        AND: [
          { roomId: { in: roomIds } }
        ]
      },
      distinct: ['roomId'],
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        User: true
      }
    })
    return messages;
  }
}