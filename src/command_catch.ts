import { State } from "./state";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("you must provide a pokemon name");
  }

  const pokemon = args[0];
  if (state.pokedex[pokemon]) {
    console.log();
    console.log(`you already caught ${pokemon}.`);
    console.log();
    return;
  }

  console.log();
  console.log(`Throwing a Pokeball at ${pokemon}...`);
  const pokemonData = await state.pokeapi.fetchPokemonData(pokemon);
  const winChance = (Math.random() * 100) / pokemonData.base_experience;
  if (winChance > Math.random()) {
    console.log(`${pokemon} was caught!`);
    console.log("You may now inspect it with the inspect command.");
    state.pokedex[pokemon] = pokemonData;
  } else {
    console.log(`${pokemon} escaped!`);
  }
  console.log();
}
