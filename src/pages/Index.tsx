import { Link } from "react-router-dom";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import Icon from "@/components/ui/icon";
import { GAMES } from "@/data/games";

const featured = GAMES.filter((g) => g.isFeatured);
const newGames = GAMES.filter((g) => g.isNew).slice(0, 4);
const popularGames = [...GAMES].sort((a, b) => b.downloads - a.downloads).slice(0, 4);

const STATS = [
  { label: "Игр в каталоге", value: "10,000+", icon: "Gamepad2" },
  { label: "Активных игроков", value: "2.5M", icon: "Users" },
  { label: "Скачиваний сегодня", value: "48K", icon: "Download" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative hero-gradient py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[hsl(var(--game-purple))]/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[hsl(var(--game-cyan))]/8 blur-3xl" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[hsl(var(--game-purple))]/40 bg-[hsl(var(--game-purple))]/10 text-sm text-[hsl(var(--game-purple))] mb-6">
              <Icon name="Zap" size={14} />
              <span>Новинки каждую неделю</span>
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Лучшие игры —{" "}
              <span className="gradient-text">одно нажатие</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Скачивай игры быстро, бесплатно и безопасно. Тысячи тайтлов для PC, консолей и мобильных.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/new"
                className="px-6 py-3 rounded-xl font-semibold bg-[hsl(var(--game-purple))] text-white hover:bg-[hsl(258,90%,72%)] transition-colors flex items-center gap-2"
              >
                <Icon name="Sparkles" size={18} />
                Смотреть новинки
              </Link>
              <Link
                to="/popular"
                className="px-6 py-3 rounded-xl font-semibold border border-[hsl(var(--game-border))] text-foreground hover:bg-[hsl(var(--secondary))] transition-colors flex items-center gap-2"
              >
                <Icon name="TrendingUp" size={18} />
                Популярные
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 border-y border-[hsl(var(--game-border))] bg-[hsl(var(--game-card))]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--game-purple))]/15 flex items-center justify-center shrink-0">
                  <Icon name={stat.icon} size={18} className="text-[hsl(var(--game-purple))]" />
                </div>
                <div>
                  <div
                    className="text-xl font-bold gradient-text"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-2xl font-bold gradient-text"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Рекомендуем
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.map((game) => (
              <GameCard key={game.id} game={game} size="lg" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-[hsl(var(--game-card))]/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Новинки
            </h2>
            <Link
              to="/new"
              className="text-sm text-[hsl(var(--game-purple))] hover:underline flex items-center gap-1"
            >
              Все новинки <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {newGames.map((game) => (
              <GameCard key={game.id} game={game} size="md" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Популярные
            </h2>
            <Link
              to="/popular"
              className="text-sm text-[hsl(var(--game-purple))] hover:underline flex items-center gap-1"
            >
              Все <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} size="md" />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[hsl(var(--game-border))] py-8 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[hsl(var(--game-purple))] to-[hsl(var(--game-cyan))] flex items-center justify-center">
              <Icon name="Gamepad2" size={12} className="text-white" />
            </div>
            <span
              className="font-bold text-sm gradient-text"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              СайтоИгр
            </span>
          </div>
          <p className="text-xs text-muted-foreground">© 2025 СайтоИгр. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
