import Link from "next/link";
import { DashboardCharts } from "../../components/DashboardCharts";
import { getPokemonDashboardData } from "../../lib/pokeapi";

export default async function DashboardPage() {
  const dashboardData = await getPokemonDashboardData(151);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-white dark:bg-black text-black dark:text-white">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            &larr; Voltar para Pokedex
          </Link>
        </div>
        <DashboardCharts data={dashboardData} />
      </div>
    </main>
  );
}
