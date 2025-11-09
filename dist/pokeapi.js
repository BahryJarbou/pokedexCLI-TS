export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const locations = await response.json();
            return locations;
        }
        catch (error) {
            throw new Error(`Error fetching locations: ${error.message}`);
        }
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/local-area/${locationName}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const location = await response.json();
            return location;
        }
        catch (error) {
            throw new Error(`Error fetching locations: ${error.message}`);
        }
    }
}
