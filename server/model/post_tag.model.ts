import { PrismaClient } from "@prisma/client"

export default class Post_TagModel {
  private _prisma: PrismaClient = new PrismaClient();

  async tagsToPost(postId: string, tagIds: string[]): Promise<number> {
    const data: { postId: string, tagId: string }[] =
      tagIds.map(tagId => { return { postId, tagId } })

    const result = await this._prisma.post_Tag.createMany({
      data
    })
    return result.count;
  }
}