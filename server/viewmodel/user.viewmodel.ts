import IUser from "../interfaces/user.interface";

/**
 * process user data for client side application
 * matching view model properties with client interface
 */
export default class UserViewModel implements IUser {
  id: string;
  username: string;
  bio: string;
  photo: string;
  email: string;
  follower?: { followerId: string }[];
  following?: { followedId: string }[];
  followedByUser?: boolean;

  private constructor(user: IUser) {
    this.id = user.id;
    this.username = user.username;
    this.bio = user.bio;
    this.photo = user.photo;
    this.email = user.email;

    this.follower = user.follower;
    this.following = user.following;
    this.followedByUser = user.followedByUser;
  }

  /**
   * 
   * @param post - pass in post for view model mappin
   * @param options - options for mapping optional user attributes
   * 
   */
  static async build(user: IUser, options?: { mapLikedBy?: boolean }): Promise<UserViewModel> {
    if (options) user = await this.mapLikedByUser(user);

    return new UserViewModel(user);
  }

  private static async mapLikedByUser(user: IUser): Promise<IUser> {
    user.followedByUser = user.follower.length == 1;
    // user.followedByUser = user.follower.map(follower => follower.followerId).indexOf(userId);
    return user;
  }
}