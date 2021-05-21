export default interface IUser {
  id: string;
  username: string;
  bio: string;
  photo: string;
  email: string;
  follower?: { followerId: string }[];
  following?: { followedId: string }[];
  followedByUser?: boolean;
  
  // posts?: Array<IPost>;
}