import IUser from "../../../interfaces/user.interface";
import UserModel from "../../../model/user.model";
import LikesModel from "../../../model/likes.model";
import RelationshipModel from "../../../model/relationship.model";
import UserViewModel from "../../../viewmodel/user.viewmodel";

export default class UserService {
  private _userdb: UserModel = new UserModel();
  private _likesdb: LikesModel = new LikesModel();
  private _relationshipdb: RelationshipModel = new RelationshipModel();

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

  async followUnfollow(userId: string, hostId: string, followToggle: boolean): Promise<boolean> {
    console.log(`userId: ${userId}, hostId: ${hostId}`);
    const response = followToggle
      ? await this._relationshipdb.followUser(userId, hostId)
      : await this._relationshipdb.unfollowUser(userId, hostId);
    if (response) return true;
    return false;
  }

  async suggestFollow(userId: string): Promise<IUser[]> {
    let users = await this._userdb.suggestFollow(userId);
    for (let i = 0; i < users.length; i++) {
      users[i] = await UserViewModel.build(users[i], { mapLikedBy: true });
    }
    return users;
  }
}