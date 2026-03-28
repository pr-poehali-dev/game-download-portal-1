import { useState } from "react";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import Icon from "@/components/ui/icon";
import { GENRES } from "@/data/games";
import { useGames } from "@/context/GamesContext";

export default function NewGames() {
  const { games } = useGames();
  const [activeGenre, setActiveGenre] = useState("Все");

  const newGames = games.filter((g) => g.isNew);
  const filtered =
    activeGenre === "Все"
      ? newGames
      : newGames.filter((g) => g.genre === activeGenre);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[hsl(var(--game-cyan))]/15 flex items-center justify-center">
            <Icon name="Sparkles" size={20} className="text-[hsl(var(--game-cyan))]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Новинки
            </h1>
            <p className="text-sm text-muted-foreground">{newGames.length} игр добавлено недавно</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeGenre === genre
                  ? "bg-[hsl(var(--game-cyan))]/20 text-[hsl(var(--game-cyan))] border border-[hsl(var(--game-cyan))]/30"
                  : "bg-[hsl(var(--secondary))] text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((game) => (
              <GameCard key={game.id} game={game} size="md" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Icon name="Search" size={40} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Нет новинок в этом жанре</p>
          </div>
        )}
      </div>
    </div>
  );
}