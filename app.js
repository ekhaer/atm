import { Commandline } from "./commandline.js";
import { Account } from "./account.js";

async function main() {
  // Login
  const username = await Commandline.ask(
    "$ Login"
  );
  try {
    //account checking
    if(await Account.find(username) === null) {
        //user is not exist
        const createAccount = await Commandline.ask(
          "This account does not exist, do you wish to create it? (yes / no)"
        );
  
        if (createAccount === "yes") {
          Account.createUser(username);
          const account = new Account(username);
          await account.getBalance(username);
          account.print();
          machineAsk(account);
        } else {
          return;
        }
    } else {
        //user is exist
        const account = new Account(username);
        await account.print();
        machineAsk(account);
    }
  } catch (error) {
    console.log(error);
  }
}

async function machineAsk(account) {
    const action = await Commandline.ask(
      "What would you like to do?"
    );
    let input = action.split(" ");
    let amount = parseFloat(input[1]);
    let receiver = "";
    if (action.includes("deposit")) {
      await account.deposit(amount);
    } else if (action.includes("withdraw")) {
      await account.withdraw(amount);
    } else if (action.includes("transfer")) {
      amount = parseFloat(input[2]);
      receiver = input[1];
      await account.transfer(amount, receiver);
    } else if (action === "logout") {
      await account.logout();
    }
  }


main();
