export async function commandMapb(state) {
    try {
        if (state.prevLocation === "")
            throw new Error("There is no previous locations, you are on the page 0 or 1, use map command instead");
        const locations = await state.pokeapi.fetchLocations(state.prevLocation);
        state.prevLocation = locations.previous || "";
        state.nextLocation = locations.next;
        locations.results.forEach((location) => {
            console.log(location.name);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}
