import { Filesystem } from "./filesystem.js";

export class Account {
  constructor(name) {
    this.name = name;
  }

  name;

  get name() {
    return this.name;
  }

  async getBalance() {
    let read = await Filesystem.read(this.name);
    if (isNaN(read)) {
      this.balance = 0
    } else {
      this.balance = parseFloat(await Filesystem.read(this.name));
    }
  }

  static async find(username) {
    try {
      return await Filesystem.read(username);
    } catch (error) {
      return null;
    }
  }

  static async deposit(amount) {
    console.log("deposit : ", amount)
  }

  static async withdraw(amount) {
    console.log("withdraw")
  }

  static async transfer(amount, receiver) {
    console.log("will transfer", amount, " to ", receiver )
  }

  static async createUser() {
    console.log("createUser")
  }

}
