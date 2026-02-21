"use client";

import { useMemo, useState } from "react";
import { Pokemon } from "../lib/types";
import { PokemonCard } from "./PokemonCard";

interface PokemonGridProps {
  initialPokemonList: Pokemon[];
}

type StatKey = keyof Pokemon["stats"];

const statOptions: { label: string; value: StatKey }[] = [
  { label: "HP", value: "hp" },
  { label: "Attack", value: "attack" },
  { label: "Defense", value: "defense" },
  { label: "Sp. Attack", value: "special-attack" },
  { label: "Sp. Defense", value: "special-defense" },
  { label: "Speed", value: "speed" },
  { label: "Total", value: "total" },
];

export function PokemonGrid({ initialPokemonList }: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedGeneration, setSelectedGeneration] = useState("all");
  const [selectedAbility, setSelectedAbility] = useState("all");
  const [selectedStat, setSelectedStat] = useState<StatKey>("total");
  const [minimumStat, setMinimumStat] = useState("0");

  const uniqueTypes = useMemo(
    () => Array.from(new Set(initialPokemonList.flatMap((pokemon) => pokemon.types))).sort(),
    [initialPokemonList]
  );

  const uniqueGenerations = useMemo(
    () => Array.from(new Set(initialPokemonList.map((pokemon) => pokemon.generation))).sort((a, b) => a - b),
    [initialPokemonList]
  );

  const uniqueAbilities = useMemo(
    () => Array.from(new Set(initialPokemonList.flatMap((pokemon) => pokemon.abilities))).sort(),
    [initialPokemonList]
  );

  const parsedMinimumStat = Number(minimumStat) || 0;

  const filteredPokemon = initialPokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = selectedType === "all" || pokemon.types.includes(selectedType);
    const matchesGeneration =
      selectedGeneration === "all" || pokemon.generation === Number(selectedGeneration);
    const matchesAbility =
      selectedAbility === "all" || pokemon.abilities.includes(selectedAbility);
    const matchesStat = pokemon.stats[selectedStat] >= parsedMinimumStat;

    return matchesSearch && matchesType && matchesGeneration && matchesAbility && matchesStat;
  });

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search Pokemon..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
        >
          <option value="all">Todos os tipos</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={selectedGeneration}
          onChange={(e) => setSelectedGeneration(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
        >
          <option value="all">Todas as gerações</option>
          {uniqueGenerations.map((generation) => (
            <option key={generation} value={generation}>
              Geração {generation}
            </option>
          ))}
        </select>

        <select
          value={selectedAbility}
          onChange={(e) => setSelectedAbility(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
        >
          <option value="all">Todas as habilidades</option>
          {uniqueAbilities.map((ability) => (
            <option key={ability} value={ability}>
              {ability}
            </option>
          ))}
        </select>

        <select
          value={selectedStat}
          onChange={(e) => setSelectedStat(e.target.value as StatKey)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
        >
          {statOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={0}
          max={1000}
          value={minimumStat}
          onChange={(e) => setMinimumStat(e.target.value)}
          placeholder="Status mínimo"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      
      {filteredPokemon.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          Nenhum Pokémon encontrado com os filtros atuais.
        </p>
      )}
    </div>
  );
}
