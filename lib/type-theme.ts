export const TYPE_THEME: Record<
  string,
  {
    card: string;
    chip: string;
    progress: string;
  }
> = {
  fire: {
    card: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900",
    chip: "bg-red-500 text-white",
    progress: "bg-red-500",
  },
  water: {
    card: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900",
    chip: "bg-blue-500 text-white",
    progress: "bg-blue-500",
  },
  grass: {
    card: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900",
    chip: "bg-green-500 text-white",
    progress: "bg-green-500",
  },
  electric: {
    card: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900",
    chip: "bg-yellow-500 text-black",
    progress: "bg-yellow-500",
  },
  psychic: {
    card: "bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-900",
    chip: "bg-pink-500 text-white",
    progress: "bg-pink-500",
  },
  ice: {
    card: "bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-900",
    chip: "bg-cyan-500 text-black",
    progress: "bg-cyan-500",
  },
  dragon: {
    card: "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900",
    chip: "bg-indigo-500 text-white",
    progress: "bg-indigo-500",
  },
  dark: {
    card: "bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700",
    chip: "bg-zinc-700 text-white",
    progress: "bg-zinc-700",
  },
  fairy: {
    card: "bg-fuchsia-50 dark:bg-fuchsia-950/30 border-fuchsia-200 dark:border-fuchsia-900",
    chip: "bg-fuchsia-500 text-white",
    progress: "bg-fuchsia-500",
  },
  fighting: {
    card: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900",
    chip: "bg-orange-600 text-white",
    progress: "bg-orange-600",
  },
  poison: {
    card: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900",
    chip: "bg-purple-500 text-white",
    progress: "bg-purple-500",
  },
  ground: {
    card: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900",
    chip: "bg-amber-600 text-white",
    progress: "bg-amber-600",
  },
  flying: {
    card: "bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900",
    chip: "bg-sky-500 text-white",
    progress: "bg-sky-500",
  },
  bug: {
    card: "bg-lime-50 dark:bg-lime-950/30 border-lime-200 dark:border-lime-900",
    chip: "bg-lime-600 text-white",
    progress: "bg-lime-600",
  },
  rock: {
    card: "bg-stone-100 dark:bg-stone-900 border-stone-300 dark:border-stone-700",
    chip: "bg-stone-600 text-white",
    progress: "bg-stone-600",
  },
  ghost: {
    card: "bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-900",
    chip: "bg-violet-600 text-white",
    progress: "bg-violet-600",
  },
  steel: {
    card: "bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700",
    chip: "bg-slate-600 text-white",
    progress: "bg-slate-600",
  },
  normal: {
    card: "bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800",
    chip: "bg-gray-500 text-white",
    progress: "bg-gray-500",
  },
};

const DEFAULT_THEME = {
  card: "bg-gray-50 dark:bg-neutral-900/50 border-gray-200 dark:border-neutral-800",
  chip: "bg-gray-500 text-white",
  progress: "bg-blue-500",
};

export function getTypeTheme(type?: string) {
  if (!type) return DEFAULT_THEME;
  return TYPE_THEME[type] ?? DEFAULT_THEME;
}
