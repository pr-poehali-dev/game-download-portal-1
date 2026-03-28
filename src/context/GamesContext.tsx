import { createContext, useContext, useState, ReactNode } from "react";
import { Game, GAMES } from "@/data/games";

interface GamesContextType {
  games: Game[];
  addGame: (game: Omit<Game, "id">) => void;
  deleteGame: (id: number) => void;
}

const GamesContext = createContext<GamesContextType | null>(null);

export function GamesProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<Game[]>(GAMES);

  const addGame = (game: Omit<Game, "id">) => {
    setGames((prev) => [
      { ...game, id: Date.now() },
      ...prev,
    ]);
  };

  const deleteGame = (id: number) => {
    setGames((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <GamesContext.Provider value={{ games, addGame, deleteGame }}>
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  const ctx = useContext(GamesContext);
  if (!ctx) throw new Error("useGames must be used within GamesProvider");
  return ctx;
}
