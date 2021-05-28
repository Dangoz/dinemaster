import prisma from "./prisma.client";
import ITag from "../interfaces/tag.interface";
import IPost from "../interfaces/post.interface";
import { Post, Likes, Post_Tag, Tag } from "@prisma/client";

export default class PostModel {

  async createPost(postData, id: string): Promise<IPost> {
    const newPost = await prisma.post.create({
      data: {
        message: postData.message,
        source: postData.source,
        userId: id
      }
    })

    return newPost;
  }

  async getUserPosts(userId: string, hostId: string): Promise<IPost[]> {
    const likedById = userId == hostId ? userId : hostId;
    const posts = await prisma.post.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        likesList: {
          where: { userId: likedById }
        }
      }
    })
    return posts;
  }

  async getPostsRecent(userId: string, size: number, limit: number = 20): Promise<IPost[]> {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        likesList: {
          where: { userId }
        }
      },
      take: limit,
      skip: size * limit
    })
    return posts;
  }

  async getPostsLikedByUser(userId: string, hostId: string): Promise<IPost[]> {
    const posts = await prisma.post.findMany({
      where: {
        likesList: {
          some: {
            userId
          }
        }
      },
      include: {
        likesList: {
          where: {
            OR: [
              { userId },
              { userId: hostId }
            ]
          }
        }
      }
    })
    return posts;
  }

  async getPostsByTag(tag: ITag, userId: string): Promise<IPost[]> {
    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            tagId: tag.id
          }
        }
      },
      include: {
        likesList: {
          where: { userId }
        }
      }
    })
    return posts;
  }

  async getPostsByTagName(name: string, userId: string, postId: string): Promise<IPost[]> {
    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            Tag: {
              name
            }
          }
        },
        NOT: { id: postId }
      },
      include: {
        likesList: {
          where: { userId }
        }
      }
    })
    return posts;
  }

  async getPostById(id: string, userId: string): Promise<IPost> {
    const post = await prisma.post.findUnique({
      where: {
        id
      },
      include: {
        likesList: {
          where: { userId }
        }
      }
    })
    return post;
  }

  // async deletePostById(id: string): Promise<void> {
  //   await this._prisma.post.delete({
  //     where: { id },

  //   })
  // }
}