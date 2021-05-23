import RoomModel from "../../../model/room.model";
import User_RoomModel from "../../../model/user_room.model";

export default class MessageService {
  private _roomdb: RoomModel = new RoomModel();
  private _user_roomdb: User_RoomModel = new User_RoomModel();

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
}