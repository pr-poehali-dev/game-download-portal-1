import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { GAMES } from "@/data/games";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof GAMES>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length >= 1) {
      const filtered = GAMES.filter((g) =>
        g.title.toLowerCase().includes(query.toLowerCase()) ||
        g.genre.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (game: typeof GAMES[0]) => {
    setQuery(game.title);
    setIsOpen(false);
    setFocused(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
          focused
            ? "border-[hsl(var(--game-purple))] bg-[hsl(220,18%,11%)] shadow-[0_0_0_2px_rgba(139,92,246,0.2)]"
            : "border-[hsl(var(--game-border))] bg-[hsl(var(--game-card))]"
        }`}>
          <Icon name="Search" size={16} className="text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Поиск игр..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {query && (
            <button type="button" onClick={() => { setQuery(""); setSuggestions([]); setIsOpen(false); }}>
              <Icon name="X" size={14} className="text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          )}
        </div>
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-[hsl(var(--game-border))] bg-[hsl(var(--game-card))] shadow-2xl shadow-black/50 z-50 overflow-hidden">
          {suggestions.map((game, i) => (
            <button
              key={game.id}
              onClick={() => handleSelect(game)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[hsl(220,18%,13%)] transition-colors ${
                i !== suggestions.length - 1 ? "border-b border-[hsl(var(--game-border))]" : ""
              }`}
            >
              <img src={game.image} alt={game.title} className="w-10 h-7 object-cover rounded-md shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{game.title}</div>
                <div className="text-xs text-muted-foreground">{game.genre}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Icon name="Star" size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-muted-foreground">{game.rating}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
