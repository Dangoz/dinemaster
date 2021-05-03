
import UserModel from "../../../model/user.model";
import Bcrypt from "./authen.bcrypt";
import IUser from "../../../interfaces/user.interface";

/**
 * handle & connect services for authentication requests
 */
export class AuthenticationService {
  readonly _db: UserModel = new UserModel();
  private _bcrypt: Bcrypt = new Bcrypt();

  async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    const user = await this._db.getUserByEmail(email);
    if (user) {
      if (await this._bcrypt.validate(password, user.password)) {
        return user;
      }
    }
  }

  async findUserByEmail(email: string): Promise<IUser> {
    return await this._db.getUserByEmail(email);
  }

  async createUser(user: any): Promise<IUser> {
    const hash = await this._bcrypt.encrypt(user.password);
    const newUser = await this._db.createUser(user, hash);
    return newUser;
  }
}