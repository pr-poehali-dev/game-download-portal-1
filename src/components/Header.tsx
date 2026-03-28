import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", to: "/" },
  { label: "Новинки", to: "/new" },
  { label: "Популярные", to: "/popular" },
  { label: "Профиль", to: "/profile" },
];

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[hsl(var(--game-border))] bg-[hsl(220,20%,6%)]/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center gap-6">
        <Link to="/" className="shrink-0 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--game-purple))] to-[hsl(var(--game-cyan))] flex items-center justify-center">
            <Icon name="Gamepad2" size={16} className="text-white" />
          </div>
          <span className="font-rajdhani text-lg font-bold gradient-text hidden sm:block" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            СайтоИгр
          </span>
        </Link>

        <div className="flex-1 hidden md:flex">
          <SearchBar />
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-[hsl(var(--game-purple))]/20 text-[hsl(var(--game-purple))]"
                  : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--secondary))]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className={`ml-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              location.pathname === "/admin"
                ? "bg-[hsl(var(--game-cyan))]/20 text-[hsl(var(--game-cyan))]"
                : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--secondary))]"
            }`}
          >
            <Icon name="Shield" size={14} />
            Админ
          </Link>
        </nav>

        <button
          className="md:hidden ml-auto p-2 rounded-lg hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </div>

      <div className="md:hidden px-4 pb-3">
        <SearchBar />
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[hsl(var(--game-border))] bg-[hsl(var(--game-card))]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 text-sm font-medium border-b border-[hsl(var(--game-border))] transition-colors ${
                location.pathname === link.to
                  ? "text-[hsl(var(--game-purple))]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}