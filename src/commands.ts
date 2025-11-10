import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";

import { CLICommand } from "./state";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mabp.js";
import { commandExplore } from "./command_explore.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedox",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Show the next 20 locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Show the previous 20 locations",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Show pokemons available in the area",
      callback: commandExplore,
    },
  };
}
