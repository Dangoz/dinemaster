// import IComment from "./comment.interface";

export default interface IPost {
  id: string;
  message: string;
  source: string;
  userId: string;
  createdAt?: Date;
  // commentList?: Array<IComment>;
  likes?: number;
  comments?: number;
  username?: string;
  likedByUser?: boolean;
}