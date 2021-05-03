import bcrypt from "bcrypt";

// salt/hash encryption for passwords
export default class Bcrypt {
  saltRounds: number = 10;

  public async encrypt(password): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch(err) {
      console.log(err);
    }
  }

  public async validate(password, hash): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch(err) {
      console.log(err);
    }
  }
}