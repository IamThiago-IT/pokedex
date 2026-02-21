import { Pokemon, PokemonDetail, PokemonListResponse } from "./types";

const POKEMON_API = "https://pokeapi.co/api/v2/pokemon";

// Helper to get ID from URL
function getPokemonIdFromUrl(url: string): number {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 2]);
}

export async function getPokemonList(limit = 151): Promise<Pokemon[]> {
  const response = await fetch(`${POKEMON_API}?limit=${limit}`);
  const data: PokemonListResponse = await response.json();

  return data.results.map((pokemon) => {
    const id = getPokemonIdFromUrl(pokemon.url);
    return {
      name: pokemon.name,
      url: pokemon.url,
      id,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    };
  });
}

export async function getPokemon(name: string): Promise<PokemonDetail> {
  const response = await fetch(`${POKEMON_API}/${name}`);
  if (!response.ok) {
      throw new Error(`Failed to fetch pokemon: ${name}`);
  }
  return response.json();
}
