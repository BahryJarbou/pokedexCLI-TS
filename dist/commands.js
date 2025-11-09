import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mabp.js";
export function getCommands() {
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
    };
}
