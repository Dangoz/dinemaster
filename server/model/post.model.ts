import { PrismaClient } from "@prisma/client";
import IPost from "../interfaces/post.interface";

export default class PostModel {
  private _prisma: PrismaClient = new PrismaClient();

  async createPost(postData, id: string): Promise<IPost> {
    const newPost = await this._prisma.post.create({
      data: {
        message: postData.message,
        source: postData.source,
        userId: id,
        tags: {
          create: [ { tagId: '123' } ]
        }
      }
    })

    return newPost;
  }

  async getUserPosts(userId: string): Promise<IPost[]> {
    const posts = await this._prisma.post.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        likesList: {
          where: { userId }
        }
      }
    })
    return posts;
  }

  async getPostsRecent(userId: string): Promise<IPost[]> {
    const posts = await this._prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        likesList: {
          where: { userId }
        }
      },
      take: 20,
      skip: 0
    })
    return posts;
  }

  // async getPostById(id: string): Promise<IPost> {
  //   const post = await this._prisma.post.findUnique({
  //     where: { id }
  //   })
  //   return post;
  // }

  // async deletePostById(id: string): Promise<void> {
  //   await this._prisma.post.delete({
  //     where: { id },
      
  //   })
  // }

  // async getPostsByKeyword(keyword: string): Promise<IPost[]> {
  //   return await this._prisma.post.findMany({
  //     where: {
  //       message: {
  //         contains: keyword
  //       }
  //     }
  //   })
  // }

  // async updateRepost(postId: string): Promise<void> {
  //   const post = await this._prisma.post.findUnique({ where: { id: postId } });

  //   await this._prisma.post.update({
  //     where: { id: postId },
  //     data: {
  //       reposts: post.reposts + 1
  //     }
  //   })
  // }
}