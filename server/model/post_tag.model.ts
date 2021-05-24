import prisma from "./prisma.client";

export default class Post_TagModel {

  async tagsToPost(postId: string, tagIds: string[]): Promise<number> {
    const data: { postId: string, tagId: string }[] =
      tagIds.map(tagId => { return { postId, tagId } })

    const result = await prisma.post_Tag.createMany({
      data
    })
    return result.count;
  }
}