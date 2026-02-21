export interface Pokemon {
  name: string;
  url: string;
  id: number;
  image: string;
  primaryType: string;
  types: string[];
  generation: number;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    "special-attack": number;
    "special-defense": number;
    speed: number;
    total: number;
  };
}

export interface PokemonParams {
  params: Promise<{ name: string }>;
}

export interface PokemonDetail {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface DashboardStatAverage {
  stat: string;
  average: number;
}

export interface DashboardTopPokemon {
  id: number;
  name: string;
  total: number;
}

export interface DashboardTypeCount {
  type: string;
  count: number;
}

export interface PokemonDashboardData {
  statAverages: DashboardStatAverage[];
  topPokemonByTotal: DashboardTopPokemon[];
  typeDistribution: DashboardTypeCount[];
}
