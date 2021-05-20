// import IComment from "./comment.interface";

export default interface IPost {
  id: string;
  message: string;
  source: string;
  userId: string;
  createdAt: Date;
  likes: number;
  likedByUser: boolean;
  comments?: number;
  username?: string;
  // commentList?: Array<IComment>;
}