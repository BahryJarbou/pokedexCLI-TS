import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    try {
      const cacheEntry = this.cache.get<ShallowLocations>(url);
      if (cacheEntry) {
        return cacheEntry;
      }
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const locations: ShallowLocations = await response.json();
      this.cache.add(url, locations);
      console.log("FROM POKEAPI");
      return locations;
    } catch (error) {
      throw new Error(`Error fetching locations: ${(error as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    try {
      const cacheEntry = this.cache.get<Location>(url);
      if (cacheEntry) {
        return cacheEntry;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      const location = await response.json();
      this.cache.add(url, location);
      return location;
    } catch (error) {
      throw new Error(`Error fetching location: ${(error as Error).message}`);
    }
  }
  async fetchPokemoneNames(locationName: string) {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    try {
      const cacheEntry = this.cache.get<Location>(url);
      if (cacheEntry) {
        const pokemons = cacheEntry.pokemon_encounters.map(
          (encounter) => encounter.pokemon.name
        );
        return pokemons;
      }
      const location = await this.fetchLocation(locationName);
      this.cache.add(url, location);
      const pokemons = location.pokemon_encounters.map(
        (encounter) => encounter.pokemon.name
      );
      return pokemons;
    } catch (error) {
      throw new Error(
        `Error fetching pokemon names: ${(error as Error).message}`
      );
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string | null;
  results: result[];
};

type result = {
  name: string;
  url: string;
};

export interface Location {
  encounter_method_rates: EncounterMethodRate[];
  game_index: number;
  id: number;
  location: LocationName;
  name: string;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod;
  version_details: VersionDetail[];
}

export interface EncounterMethod {
  name: string;
  url: string;
}

export interface VersionDetail {
  rate: number;
  version: Version;
}

export interface Version {
  name: string;
  url: string;
}

export interface LocationName {
  name: string;
  url: string;
}

export interface Name {
  language: Language;
  name: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface PokemonEncounter {
  pokemon: Pokemon;
  version_details: VersionDetail2[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface VersionDetail2 {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: Version2;
}

export interface EncounterDetail {
  chance: number;
  condition_values: any[];
  max_level: number;
  method: Method;
  min_level: number;
}

export interface Method {
  name: string;
  url: string;
}

export interface Version2 {
  name: string;
  url: string;
}
