import UserModel from "../../../model/user.model";
import LikesModel from "../../../model/likes.model";
import express from "express";

export default class UserService {
  private _userdb: UserModel = new UserModel();
  private _likesdb: LikesModel = new LikesModel();

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
}