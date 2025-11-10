import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, PokemonData } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocation: string;
  prevLocation: string;
  pokedex: Record<string, PokemonData>;
};

export function initState(cacheInterval: number): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  return {
    readline: rl,
    commands: getCommands(),
    pokeapi: new PokeAPI(cacheInterval),
    nextLocation: "https://pokeapi.co/api/v2/location-area",
    prevLocation: "",
    pokedex: {},
  };
}
