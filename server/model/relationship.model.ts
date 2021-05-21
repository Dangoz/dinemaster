import { PrismaClient, Relationship } from "@prisma/client";

export default class RelationshipModel {
  private _prisma: PrismaClient = new PrismaClient();

  // create new relationship
  async followUser(followedId: string, followerId: string): Promise<Relationship> {
    const result = await this._prisma.relationship.create({
      data: {
        followerId,
        followedId
      }
    })
    return result;
  }


  // delete a relationship
  async unfollowUser(followedId: string, followerId: string): Promise<Relationship> {
    const result = await this._prisma.relationship.delete({
      where: {
        followerId_followedId: {
          followerId,
          followedId
        }
      }
    })
    return result;
  }
}