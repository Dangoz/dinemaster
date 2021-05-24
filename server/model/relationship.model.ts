import { Relationship } from "@prisma/client";
import prisma from "./prisma.client";

export default class RelationshipModel {

  // create new relationship
  async followUser(followedId: string, followerId: string): Promise<Relationship> {
    const result = await prisma.relationship.create({
      data: {
        followerId,
        followedId
      }
    })
    return result;
  }


  // delete a relationship
  async unfollowUser(followedId: string, followerId: string): Promise<Relationship> {
    const result = await prisma.relationship.delete({
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