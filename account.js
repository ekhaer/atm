import { Filesystem } from "./filesystem.js";

export class Account {
  constructor(name) {
    this.name = name;
  }

  name;

  get name() {
    return this.name;
  }


  static async find(username) {
    try {
      return await Filesystem.read(username);
    } catch (error) {
      return null;
    }
  }

}
