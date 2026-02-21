"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="py-6 mb-8 border-b dark:border-neutral-800">
        <div className="container mx-auto px-4 flex justify-between items-center max-w-5xl">
          <Link href="/" className="text-2xl font-bold">
            Pokedex
          </Link>
          <div className="w-8 h-8 bg-gray-200 dark:bg-neutral-800 rounded-full animate-pulse" />
        </div>
      </header>
    );
  }

  return (
    <header className="py-6 mb-8 border-b border-gray-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 flex justify-between items-center max-w-5xl">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Pokedex
        </Link>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
