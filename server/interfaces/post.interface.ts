// import IComment from "./comment.interface";
import { Likes } from "@prisma/client";

export default interface IPost {
  id: string;
  message: string;
  source: string;
  userId: string;
  createdAt: Date;
  // commentList?: Array<IComment>;
  likes: number;
  comments?: number;
  username?: string;

  likedByUser?: boolean;
  likesList?: { createdAt?: Date; userId?: string; postId?: string }[];
}
