export default interface IUser {
  id: string;
  username: string;
  bio: string;
  photo: string;
  email: string;
  password: string;
  // posts?: Array<IPost>;
  follower?: Array<string>;
  following?: Array<string>;
  followedByUser?: boolean;
}