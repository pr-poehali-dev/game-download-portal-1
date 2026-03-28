import Icon from "@/components/ui/icon";
import { Game } from "@/data/games";

interface GameCardProps {
  game: Game;
  size?: "sm" | "md" | "lg";
}

function formatDownloads(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return String(n);
}

export default function GameCard({ game, size = "md" }: GameCardProps) {
  return (
    <div className="game-card-hover rounded-xl overflow-hidden glow-border bg-[hsl(var(--game-card))] group cursor-pointer">
      <div className={`relative overflow-hidden ${size === "lg" ? "h-48" : size === "sm" ? "h-28" : "h-36"}`}>
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--game-card))] via-transparent to-transparent" />
        <div className="absolute top-2 left-2 flex gap-1.5">
          {game.isNew && (
            <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-[hsl(var(--game-cyan))] text-[hsl(var(--game-dark))]">
              NEW
            </span>
          )}
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm">
          <Icon name="Star" size={11} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-semibold text-white">{game.rating}</span>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className={`font-bold leading-tight text-foreground line-clamp-1 ${size === "sm" ? "text-sm" : "text-base"}`}
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            {game.title}
          </h3>
        </div>

        {size !== "sm" && (
          <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{game.description}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-xs bg-[hsl(var(--game-purple))]/20 text-[hsl(var(--game-purple))] font-medium">
              {game.genre}
            </span>
            <span className="text-xs text-muted-foreground">{game.size}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Icon name="Download" size={11} />
            <span>{formatDownloads(game.downloads)}</span>
          </div>
        </div>

        {size !== "sm" && (
          <button className="mt-3 w-full py-2 rounded-lg text-sm font-semibold bg-[hsl(var(--game-purple))] text-white hover:bg-[hsl(258,90%,72%)] transition-colors flex items-center justify-center gap-2">
            <Icon name="Download" size={14} />
            Скачать
          </button>
        )}
      </div>
    </div>
  );
}
