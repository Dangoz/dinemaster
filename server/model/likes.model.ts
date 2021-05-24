import prisma from "./prisma.client";

export default class LikesModel {

  async like(userId: string, postId: string): Promise<void> {
    const newLike = await prisma.likes.create({
      data: {
        userId,
        postId
      }
    })

    // update post likes
    if (!newLike) return;
    const post = await prisma.post.findUnique({ where: { id: postId }, select: { likes: true } });

    await prisma.post.update({
      where: { id: postId },
      data: {
        likes: post.likes + 1
      }
    })
  }

  async unlike(userId: string, postId: string): Promise<void> {
    const deletedLike = await prisma.likes.delete({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    })

    // update post likes
    if (!deletedLike) return;
    const post = await prisma.post.findUnique({ where: { id: postId }, select: { likes: true } });
    if (post.likes < 1) return;

    await prisma.post.update({
      where: { id: postId },
      data: {
        likes: post.likes - 1
      }
    })
  }
}