import { Filesystem } from "./filesystem.js";
import { Commandline } from "./commandline.js";

export class Account {
  constructor(name) {
    this.name = name;
  }

  name;
  balance;

  get name() {
    return this.name;
  }

  get balance() {
    return this.balance;
  }

  async getBalance(username) {
    await Filesystem.read(username);
    this.balance = parseFloat(await Filesystem.read(username));
    return this.balance;
  }

  static async find(username) {
    try {
      return await Filesystem.read(username);
    } catch (error) {
      return null;
    }
  }

  async deposit(amount) {
    if (isNaN(this.balance)) {
      this.balance = 0
    }
    this.balance = this.balance + amount;
    Filesystem.write(this.name, this.balance);
  }

  async withdraw(amount) {
    this.balance = this.balance - amount;
    await Filesystem.write(this.name, this.balance);
  }

  async print() {
    let balance = await this.getBalance(this.name)
    let output = "Your balance is : " + balance;
    console.log(output);
  }

  async logout() {
    console.log("Goodbye, ", this.name)
  }

  async transfer(amount, receiver) {
    console.log("will transfer", amount, " to ", receiver )
    let balanceReceiver = await this.getBalance(receiver);
    balanceReceiver = balanceReceiver + amount;
    Filesystem.write(receiver, balanceReceiver);

    let balanceSender = await this.getBalance(this.name);
    balanceSender = balanceSender - amount;
    Filesystem.write(this.name, balanceSender);

    this.nextCommand()
   
  }

  async nextCommand() {
    const action = await Commandline.ask("$");
  }

  static async createUser(username) {
    try { 
      await Filesystem.write(username, 0); 
      console.log("New account for ", username,  "is created")
    } catch (error) {
      console.log('Error')
    }
  }

}
