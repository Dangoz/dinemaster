import IUser from "../../../interfaces/user.interface";
import UserModel from "../../../model/user.model";
import LikesModel from "../../../model/likes.model";
import UserViewModel from "../../../viewmodel/user.viewmodel";

export default class UserService {
  private _userdb: UserModel = new UserModel();
  private _likesdb: LikesModel = new LikesModel();

  async getUserProfile(id: string): Promise<IUser> {
    let user = await this._userdb.getUserById(id);
    user = await UserViewModel.build(user);
    return user;
  }

  async updateBio(id: string, bio: string): Promise<boolean> {
    const user = await this._userdb.updateBio(id, bio);
    if (user) return true;
    return false;
  }

  async updatePhoto(id: string, photo: string): Promise<boolean> {
    const user = await this._userdb.updatePhoto(id, photo);
    if (user) return true;
    return false;
  }

  async likeUnlike(userId: string, postId: string, likeToggle: boolean): Promise<void> {
    likeToggle
      ? await this._likesdb.like(userId, postId)
      : await this._likesdb.unlike(userId, postId);
    return;
  }

  async suggestFollow(userId: string): Promise<IUser[]> {
    let users = await this._userdb.suggestFollow(userId);
    for (let i = 0; i < users.length; i++) {
      users[i] = await UserViewModel.build(users[i], {});
    }
    return users;
  }
}