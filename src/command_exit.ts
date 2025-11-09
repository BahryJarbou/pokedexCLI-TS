import { State } from "./state";

async function commandExit(state: State) {
  console.log("Closing the Pokedex... Goodbye!");
  process.exit(0);
}

export { commandExit };
