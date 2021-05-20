export default interface IUser {
  id: string;
  username: string;
  bio: string;
  photo: string;
  email: string;
  follower?: number;
  following?: number;
  followedByUser?: boolean;
  
  // posts?: Array<IPost>;
}