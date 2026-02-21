import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "../lib/types";
import { getTypeTheme } from "../lib/type-theme";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const theme = getTypeTheme(pokemon.primaryType);

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className={`group rounded-lg border px-5 py-4 transition-colors ${theme.card}`}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            className="object-contain transition-transform group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={pokemon.id <= 20}
          />
        </div>
        <h2 className="mb-3 text-2xl font-semibold capitalize">
          {pokemon.name} <span className="text-gray-500 text-sm">#{pokemon.id}</span>
        </h2>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${theme.chip}`}>
          {pokemon.primaryType}
        </span>
      </div>
    </Link>
  );
}
