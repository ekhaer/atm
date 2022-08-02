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
        //user is exist
        console.log("user is not exist")
    } else {
        //user is not exist
        console.log("user is exist")
    }
  } catch (error) {
    console.log(error);
  }
}


main();
