import { State } from "./state";

export async function commandInspect(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("you must provide a pokemon name to inspect.");
  }
  const pokemon = args[0];
  if (!state.pokedex[pokemon]) {
    throw new Error("you have not caught that pokemon");
  }

  const pokemonData = state.pokedex[pokemon];

  console.log();
  console.log("Name: ", pokemonData.name);
  console.log("Height: ", pokemonData.height);
  console.log("Weight: ", pokemonData.weight);
  console.log("Stats:");
  pokemonData.stats.forEach((stat) => {
    console.log(`   - ${stat.stat.name}: ${stat.base_stat}`);
  });
  console.log("Types");
  pokemonData.types.forEach((type) => {
    console.log(`   - ${type.type.name}`);
  });
}
