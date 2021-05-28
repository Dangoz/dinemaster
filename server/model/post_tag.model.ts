import prisma from "./prisma.client";
import { Post_Tag } from "@prisma/client";

export default class Post_TagModel {

  async tagsToPost(postId: string, tagIds: string[]): Promise<number> {
    const data: { postId: string, tagId: string }[] =
      tagIds.map(tagId => { return { postId, tagId } })

    const result = await prisma.post_Tag.createMany({
      data
    })
    return result.count;
  }

  async getTagsByPostId(postId: string): Promise<(Post_Tag & { Tag: { name: string; }; })[]> {
    const result = prisma.post_Tag.findMany({
      where: {
        postId
      },
      include: {
        Tag: {
          select: {
            name: true
          }
        }
      }
    })
    return result;
  }
}