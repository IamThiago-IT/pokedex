import Image from "next/image";
import Link from "next/link";
import { getPokemon } from "../../../lib/pokeapi";
import { PokemonParams } from "../../../lib/types";

export default async function PokemonPage({ params }: {params: Promise<{ name: string }>}) {
  const { name } = await params;
  const pokemon = await getPokemon(name);
  const image = pokemon.sprites.other["official-artwork"].front_default;

  return (
    <div className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-white dark:bg-black text-black dark:text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <Link href="/" className="mb-4 inline-block text-blue-500 hover:underline">
          &larr; Back to Pokedex
        </Link>
        
        <div className="mt-8 flex flex-col items-center">
          <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name} <span className="text-gray-500">#{pokemon.id}</span></h1>
          
          <div className="relative w-64 h-64 mb-8">
            <Image
              src={image}
              alt={pokemon.name}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
            <div className="bg-gray-100 dark:bg-neutral-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Stats</h3>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="flex justify-between items-center mb-2">
                  <span className="capitalize text-gray-700 dark:text-gray-300">{stat.stat.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{stat.base_stat}</span>
                    <div className="w-24 h-2 bg-gray-300 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-100 dark:bg-neutral-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Height</span>
                  <span className="font-bold">{pokemon.height / 10} m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Weight</span>
                  <span className="font-bold">{pokemon.weight / 10} kg</span>
                </div>
                <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Types</h4>
                    <div className="flex gap-2">
                        {pokemon.types.map((type) => (
                            <span key={type.type.name} className="px-3 py-1 bg-blue-500 text-white rounded-full capitalize text-sm">
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
