import { State } from "./state";

export async function commandPokedex(state: State, ...args: string[]) {
  if (Object.keys(state.pokedex).length === 0) {
    console.log("you haven't catched any pokemons yet.");
    return;
  }

  console.log("Your Pokedex:");

  for (const key in state.pokedex) {
    console.log(`   - ${key}`);
  }
}
