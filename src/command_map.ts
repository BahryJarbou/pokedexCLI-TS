import { State } from "./state";

export async function commandMap(state: State) {
  console.log();
  const locations = await state.pokeapi.fetchLocations(state.nextLocation);
  state.nextLocation = locations.next;
  state.prevLocation = locations.previous || "";
  locations.results.forEach((location) => {
    console.log(location.name);
  });
  state.readline.prompt();
}
