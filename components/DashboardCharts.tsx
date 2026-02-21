"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PokemonDashboardData } from "../lib/types";

interface DashboardChartsProps {
  data: PokemonDashboardData;
}

const TYPE_COLOR_HEX: Record<string, string> = {
  normal: "#9CA3AF",
  fire: "#EF4444",
  water: "#3B82F6",
  electric: "#F59E0B",
  grass: "#22C55E",
  ice: "#06B6D4",
  fighting: "#F97316",
  poison: "#A855F7",
  ground: "#D97706",
  flying: "#0EA5E9",
  psychic: "#EC4899",
  bug: "#65A30D",
  rock: "#78716C",
  ghost: "#7C3AED",
  dragon: "#4F46E5",
  dark: "#3F3F46",
  steel: "#64748B",
  fairy: "#D946EF",
};

export function DashboardCharts({ data }: DashboardChartsProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-gray-200 dark:border-neutral-800 p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4">Média de status (Top 151)</h2>
        <div className="h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.statAverages}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
              <XAxis dataKey="stat" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="average" name="Média" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 dark:border-neutral-800 p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4">Top 10 por total de status</h2>
        <div className="h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.topPokemonByTotal} margin={{ top: 8, right: 12, left: -20, bottom: 48 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-35} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" name="Total" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 dark:border-neutral-800 p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4">Distribuição de tipos (Top 10)</h2>
        <div className="h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.typeDistribution} margin={{ top: 8, right: 12, left: -20, bottom: 24 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
              <XAxis dataKey="type" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Quantidade" radius={[6, 6, 0, 0]}>
                {data.typeDistribution.map((entry) => (
                  <Cell key={entry.type} fill={TYPE_COLOR_HEX[entry.type] ?? "#6B7280"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
