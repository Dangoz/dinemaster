export default interface IUser {
  id: string;
  username: string;
  bio: string;
  photo: string;
  email: string;
  // password: string;
  // posts?: Array<IPost>;
  follower?: number;
  following?: number;
  followedByUser?: boolean;
  
}