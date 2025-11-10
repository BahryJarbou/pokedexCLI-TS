import { State } from "./state";

export async function commandExplore(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("you must provide a location name");
  }
  const areaName = args[0];
  const pokemons = await state.pokeapi.fetchPokemoneNames(areaName);
  console.log();
  console.log(`Exploring ${areaName}...`);
  console.log("Found Pokemon:");
  pokemons.forEach((poke) => {
    console.log(poke);
  });
}
