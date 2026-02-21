"use client";

import { useState } from "react";
import { Pokemon } from "../lib/types";
import { PokemonCard } from "./PokemonCard";

interface PokemonGridProps {
  initialPokemonList: Pokemon[];
}

export function PokemonGrid({ initialPokemonList }: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");

  const filteredPokemon = initialPokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search Pokemon..."
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
          No Pokemon found matching "{searchText}"
        </p>
      )}
    </div>
  );
}
