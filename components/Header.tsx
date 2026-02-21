"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="py-6 mb-8 border-b border-gray-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 flex justify-between items-center max-w-5xl">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Pokedex
          </Link>
          <Link href="/dashboard" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            Dashboard
          </Link>
        </div>
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Toggle Theme"
        >
          <Sun size={20} className="hidden dark:block" />
          <Moon size={20} className="block dark:hidden" />
        </button>
      </div>
    </header>
  );
}
