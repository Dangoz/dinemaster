// import IPost from "./post.interface";
// import * as express from "express";

export default interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  // posts?: Array<IPost>;
  following?: Array<string>;
  reposts?: Array<string>;
  followedByUser?: boolean;
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