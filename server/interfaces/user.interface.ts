import IPost from "../interfaces/post.interface";

export default interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  followers?: number;
  following?: number;
  followedByUser?: boolean;

  posts?: Array<IPost>;
}

// extend Express.User with IUser properties
declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      email: string;
      password: string;
    }
  }
}