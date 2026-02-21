import {
  Pokemon,
  PokemonDashboardData,
  PokemonDetail,
  PokemonListResponse,
} from "./types";

const POKEMON_API = "https://pokeapi.co/api/v2/pokemon";

// Helper to get ID from URL
function getPokemonIdFromUrl(url: string): number {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 2]);
}

export async function getPokemonList(limit = 151): Promise<Pokemon[]> {
  const response = await fetch(`${POKEMON_API}?limit=${limit}`);
  const data: PokemonListResponse = await response.json();

  const pokemonList = await Promise.all(
    data.results.map(async (pokemon) => {
      const id = getPokemonIdFromUrl(pokemon.url);
      const detailResponse = await fetch(`${POKEMON_API}/${id}`);
      const detail: Pick<PokemonDetail, "types"> = await detailResponse.json();
      const primaryType =
        detail.types.find((item) => item.slot === 1)?.type.name ?? detail.types[0]?.type.name ?? "normal";

      return {
        name: pokemon.name,
        url: pokemon.url,
        id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        primaryType,
      };
    })
  );

  return pokemonList;
}

export async function getPokemon(name: string): Promise<PokemonDetail> {
  const response = await fetch(`${POKEMON_API}/${name}`);
  if (!response.ok) {
      throw new Error(`Failed to fetch pokemon: ${name}`);
  }
  return response.json();
}

export async function getPokemonDashboardData(limit = 151): Promise<PokemonDashboardData> {
  const response = await fetch(`${POKEMON_API}?limit=${limit}`, {
    next: { revalidate: 3600 },
  });
  const data: PokemonListResponse = await response.json();

  const details = await Promise.all(
    data.results.map(async (pokemon) => {
      const detailResponse = await fetch(`${POKEMON_API}/${pokemon.name}`, {
        next: { revalidate: 3600 },
      });
      const detail: PokemonDetail = await detailResponse.json();
      return detail;
    })
  );

  const statSums = new Map<string, number>();
  const typeCounts = new Map<string, number>();

  const topPokemonByTotal = details
    .map((detail) => ({
      id: detail.id,
      name: detail.name,
      total: detail.stats.reduce((sum, stat) => sum + stat.base_stat, 0),
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  details.forEach((detail) => {
    detail.stats.forEach((stat) => {
      const current = statSums.get(stat.stat.name) ?? 0;
      statSums.set(stat.stat.name, current + stat.base_stat);
    });

    detail.types.forEach((typeSlot) => {
      const typeName = typeSlot.type.name;
      const current = typeCounts.get(typeName) ?? 0;
      typeCounts.set(typeName, current + 1);
    });
  });

  const statAverages = Array.from(statSums.entries()).map(([stat, sum]) => ({
    stat,
    average: Number((sum / details.length).toFixed(2)),
  }));

  const typeDistribution = Array.from(typeCounts.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    statAverages,
    topPokemonByTotal,
    typeDistribution,
  };
}
