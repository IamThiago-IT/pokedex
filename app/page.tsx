import { PokemonGrid } from "../components/PokemonGrid";
import { getPokemonList } from "../lib/pokeapi";

export default async function Home() {
  const pokemonList = await getPokemonList(151);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-white dark:bg-black text-black dark:text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Pokedex</h1>
        <PokemonGrid initialPokemonList={pokemonList} />
      </div>
    </main>
  );
}

