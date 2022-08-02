import { Commandline } from "./commandline.js";
import { Account } from "./account.js";

async function main() {
  // Login
  const username = await Commandline.ask(
    "Login"
  );
  try {
    //account checking
    if(await Account.find(username) === null) {
        //user is not exist
        console.log("user is not exist")

    } else {
        //user is exist
        console.log("user is exist")
        const account = new Account(username);
        await account.getBalance();
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
      await Account.deposit(amount);
    } else if (action.includes("withdraw")) {
      await Account.withdraw(amount);
    } else if (action.includes("transfer")) {
      amount = parseFloat(input[2]);
      receiver = input[1];
      await Account.transfer(amount, receiver);
    }
    // account.print();
  }


main();
