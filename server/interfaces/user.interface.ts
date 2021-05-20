import IPost from "../interfaces/post.interface";

export default interface IUser {
  id: string;
  username: string;
  photo: string;
  bio: string;
  email: string;
  password?: string;
  follower?: { followerId: string }[];
  following?: { followedId: string }[];
  followedByUser?: boolean;

  posts?: Array<IPost>;
}

// extend Express.User with IUser properties
declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      photo: string;
      bio: string;
      email: string;
      password: string;
    }
  }
}