import prisma from "./prisma.client";
import IUser from "../interfaces/user.interface";

export default class UserModel {

  // get user by input email
  async getUserByEmail(email: string, relationship: boolean = true): Promise<IUser> {
    const user = await prisma.user.findUnique({
      where: { email },
      ...(relationship && {
        include: {
          following: { select: { followedId: true } },
          follower: { select: { followerId: true } }
        }
      }),
    });

    return user;
  }

  // get user by input id
  async getUserById(id: string, relationship: boolean = true): Promise<IUser> {
    const user = await prisma.user.findUnique({
      where: { id },
      ...(relationship && {
        include: {
          following: { select: { followedId: true } },
          follower: { select: { followerId: true } }
        }
      }),
    });
    return user;
  }

  async getUserByIdList(idList: string[]): Promise<IUser[]> {
    const users = await prisma.user.findMany({
      where: {
        id: { in: idList }
      }
    })
    return users;
  }

  // insert a new user given user data
  async createUser(user: any, hash: string): Promise<IUser> {
    const { username, email } = user;
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hash
      }
    })
    return newUser;
  }

  // get users by keyword
  async getUsersByKeyword(keyword: string): Promise<IUser[]> {
    let keywordReverseCase =
      keyword === keyword.toLowerCase()
        ? keyword.toUpperCase()
        : keyword.toLowerCase()

    return await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: keyword
            },
          },
          {
            username: {
              contains: keywordReverseCase
            },
          }

        ]
      }
    })
  }

  async updateBio(id: string, bio: string): Promise<IUser> {
    const user = prisma.user.update({
      where: { id },
      data: { bio }
    })
    return user;
  }

  async updatePhoto(id: string, photo: string): Promise<IUser> {
    const user = prisma.user.update({
      where: { id },
      data: { photo }
    })
    return user;
  }

  async suggestFollow(userId: string, suggestNum: number = 16): Promise<IUser[]> {
    const users = await prisma.user.findMany({
      where: {
        id: { not: userId },
        follower: {
          none: {
            followerId: userId
          }
        }
      },
      include: {
        follower: {
          where: {
            followerId: userId
          },
          select: {
            followerId: true
          }
        }
      },
      take: suggestNum
    })
    return users;
  }
}