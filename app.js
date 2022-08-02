import { Commandline } from "./commandline.js";

async function main() {
  // Login
  const accountName = await Commandline.ask(
    "Login"
  );
  try {
    
  } catch (error) {
    console.log(error);
  }
}


main();
