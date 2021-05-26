import IUser from "../../../interfaces/user.interface";
import UserModel from "../../../model/user.model";
import RoomModel from "../../../model/room.model";
import User_RoomModel from "../../../model/user_room.model";
import UserViewModel from "../../../viewmodel/user.viewmodel";
import Sort from "../../util/sort";

export default class MessageService {
  private _roomdb: RoomModel = new RoomModel();
  private _user_roomdb: User_RoomModel = new User_RoomModel();
  private _userdb: UserModel = new UserModel();

  async getRoom(uid1: string, uid2: string): Promise<string> {
    const existingRoom = await this._user_roomdb.getRoomByTwoUsers(uid1, uid2);
    console.log("existingRoom", existingRoom);
    if (existingRoom) return existingRoom;

    // create new room
    const newRoom = await this._roomdb.createRoom();
    console.log([uid1, uid2]);
    await this._user_roomdb.createUserRoom(newRoom.id, [uid1, uid2]);
    return newRoom.id;
  }

  async defaultSwiperUsers(userId: string, followingIds: string[]): Promise<IUser[]> {
    let users = await this._userdb.getUserByIdList(followingIds);

    if (users.length !== 16) {
      const suggestUsers = await this._userdb.suggestFollow(userId, 16 - users.length);
      users = [...users, ...suggestUsers];
    }
    for (let i = 0; i < users.length; i++) {
      users[i] = await UserViewModel.build(users[i]);
    }
    console.log("users", users);
    return users;
  }

  async searchUser(queryList: string[]): Promise<IUser[]> {
    let users: IUser[] = [];

    // optional - split out each letter for case senitive search
    for (let query of queryList) {
      queryList = [...queryList, ...query.split("")]
    }
    console.log(queryList);
    // parse users by each query keyword
    for (let query of queryList) {
      users = [...users, ...await this._userdb.getUsersByKeyword(query)]
    }

    // sort by frequency
    users = await Sort.sortByFrequency(users);

    // slice, build and return the 16 most relevant result
    users = users.slice(0, 16);
    for (let i = 0; i < users.length; i++) {
      users[i] = await UserViewModel.build(users[i]);
    }
    return users;
  }
}