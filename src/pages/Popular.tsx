import { useState } from "react";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import Icon from "@/components/ui/icon";
import { GAMES, GENRES } from "@/data/games";

type SortOption = "downloads" | "rating";

export default function Popular() {
  const [activeGenre, setActiveGenre] = useState("Все");
  const [sortBy, setSortBy] = useState<SortOption>("downloads");

  const filtered = GAMES
    .filter((g) => activeGenre === "Все" || g.genre === activeGenre)
    .sort((a, b) => sortBy === "downloads" ? b.downloads - a.downloads : b.rating - a.rating);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[hsl(var(--game-pink))]/15 flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-[hsl(var(--game-pink))]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Популярные
            </h1>
            <p className="text-sm text-muted-foreground">Самые скачиваемые игры</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeGenre === genre
                    ? "bg-[hsl(var(--game-pink))]/20 text-[hsl(var(--game-pink))] border border-[hsl(var(--game-pink))]/30"
                    : "bg-[hsl(var(--secondary))] text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-sm text-muted-foreground shrink-0">Сортировка:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-sm bg-[hsl(var(--secondary))] border border-[hsl(var(--game-border))] rounded-lg px-3 py-1.5 text-foreground outline-none"
            >
              <option value="downloads">По скачиваниям</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((game, i) => (
            <div key={game.id} className="relative">
              {i < 3 && (
                <div className={`absolute -top-2 -left-2 z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === 0 ? "bg-yellow-400 text-black" :
                  i === 1 ? "bg-gray-300 text-black" :
                  "bg-amber-600 text-white"
                }`}>
                  {i + 1}
                </div>
              )}
              <GameCard game={game} size="md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
