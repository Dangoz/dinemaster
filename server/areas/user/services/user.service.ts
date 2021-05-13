import UserModel from "../../../model/user.model";
import express from "express";

export default class UserService {
  private _userdb: UserModel = new UserModel();

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
}