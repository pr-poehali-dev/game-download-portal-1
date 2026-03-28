import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const GAMES = [
  {
    id: 1,
    title: "Cyber Chronicles",
    genre: "RPG",
    rating: 4.8,
    size: "52 GB",
    downloads: "2.4М",
    isNew: true,
    isHot: false,
    image: "https://cdn.poehali.dev/projects/5ee7899d-60e0-4f3f-9f9f-883cb52fca98/files/88d1d5ea-c509-47d4-ac95-4838caa170a1.jpg",
    tags: ["Экшн", "Киберпанк", "RPG"],
    price: "Бесплатно",
    year: 2025,
  },
  {
    id: 2,
    title: "Dragon Realms",
    genre: "Adventure",
    rating: 4.6,
    size: "78 GB",
    downloads: "1.8М",
    isNew: false,
    isHot: true,
    image: "https://cdn.poehali.dev/projects/5ee7899d-60e0-4f3f-9f9f-883cb52fca98/files/2162ac5f-19df-435a-b980-f3c3e18f6257.jpg",
    tags: ["Открытый мир", "Фэнтези"],
    price: "799 ₽",
    year: 2024,
  },
  {
    id: 3,
    title: "Neon Velocity",
    genre: "Racing",
    rating: 4.5,
    size: "24 GB",
    downloads: "3.1М",
    isNew: true,
    isHot: true,
    image: "https://cdn.poehali.dev/projects/5ee7899d-60e0-4f3f-9f9f-883cb52fca98/files/0c9e45f6-48f6-48fd-bb96-4af21e25ef11.jpg",
    tags: ["Гонки", "Аркада"],
    price: "499 ₽",
    year: 2025,
  },
  {
    id: 4,
    title: "Wasteland Strike",
    genre: "Shooter",
    rating: 4.7,
    size: "45 GB",
    downloads: "5.6М",
    isNew: false,
    isHot: true,
    image: "https://cdn.poehali.dev/projects/5ee7899d-60e0-4f3f-9f9f-883cb52fca98/files/90a19630-dd7b-447a-9c63-83801210f5b6.jpg",
    tags: ["Шутер", "Выживание"],
    price: "Бесплатно",
    year: 2024,
  },
  {
    id: 5,
    title: "Star Dominion",
    genre: "Strategy",
    rating: 4.4,
    size: "18 GB",
    downloads: "890К",
    isNew: true,
    isHot: false,
    image: "https://cdn.poehali.dev/projects/5ee7899d-60e0-4f3f-9f9f-883cb52fca98/files/a59d4f86-d473-4838-907a-c656f923c50c.jpg",
    tags: ["Стратегия", "Космос"],
    price: "1 199 ₽",
    year: 2025,
  },
  {
    id: 6,
    title: "Shadow Protocol",
    genre: "Stealth",
    rating: 4.3,
    size: "31 GB",
    downloads: "1.2М",
    isNew: false,
    isHot: false,
    image: "https://cdn.poehali.dev/projects/5ee7899d-60e0-4f3f-9f9f-883cb52fca98/files/88d1d5ea-c509-47d4-ac95-4838caa170a1.jpg",
    tags: ["Стелс", "Экшн"],
    price: "599 ₽",
    year: 2024,
  },
];

const STATS = [
  { label: "Игр в каталоге", value: "12,000+" },
  { label: "Активных игроков", value: "4.2М" },
  { label: "Скачиваний сегодня", value: "38К" },
  { label: "Новинок в месяц", value: "200+" },
];

type Tab = "home" | "new" | "popular" | "profile";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 items-center">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: "11px", color: i <= Math.floor(rating) ? "#ffd700" : "#333" }}>★</span>
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating}</span>
    </div>
  );
}

function GameCard({ game, index }: { game: typeof GAMES[0]; index: number }) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 1800);
  };

  return (
    <div
      className="game-card neon-border rounded-xl overflow-hidden"
      style={{ background: "rgba(13,17,23,0.9)", opacity: 0, animation: `fade-up 0.5s ease forwards ${index * 0.07}s` }}
    >
      <div className="relative aspect-video overflow-hidden">
        <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
        <div className="card-overlay absolute inset-0 bg-black/60 flex items-center justify-center gap-3">
          <button className="w-10 h-10 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 flex items-center justify-center hover:bg-neon-cyan/30 transition-all">
            <Icon name="Heart" size={16} className="text-neon-cyan" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all">
            <Icon name="Play" size={16} className="text-white" />
          </button>
        </div>
        <div className="absolute top-3 left-3 flex gap-1.5">
          {game.isNew && (
            <span className="tag-badge" style={{ background: "rgba(57,255,20,0.1)", borderColor: "rgba(57,255,20,0.3)", color: "#39ff14" }}>
              Новинка
            </span>
          )}
          {game.isHot && (
            <span className="tag-badge" style={{ background: "rgba(255,100,0,0.1)", borderColor: "rgba(255,100,0,0.3)", color: "#ff6400" }}>
              🔥 Хит
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 glass px-2 py-1 rounded-md text-xs text-white border border-white/10">
          {game.price}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-rajdhani font-bold text-lg text-white leading-tight">{game.title}</h3>
          <span className="text-xs text-muted-foreground flex-shrink-0 mt-0.5">{game.year}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Stars rating={game.rating} />
          <span className="text-muted-foreground/50">·</span>
          <span className="text-xs text-muted-foreground">{game.downloads} загрузок</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {game.tags.map(tag => (
            <span key={tag} className="tag-badge">{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Icon name="HardDrive" size={12} />
            {game.size}
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading || downloaded}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              downloaded
                ? "bg-green-500/20 border border-green-500/30 text-green-400 cursor-default"
                : downloading
                ? "bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan cursor-default"
                : "btn-neon"
            }`}
          >
            {downloaded ? (
              <><Icon name="Check" size={13} /> Скачано</>
            ) : downloading ? (
              <><div className="w-3 h-3 border border-neon-cyan border-t-transparent rounded-full animate-spin" /> Загрузка...</>
            ) : (
              <><Icon name="Download" size={13} /> Скачать</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  const achievements = [
    { icon: "🎮", title: "Первая игра", desc: "Скачал первую игру" },
    { icon: "🔥", title: "На волне", desc: "3 игры за неделю" },
    { icon: "⭐", title: "Критик", desc: "Оставил 10 отзывов" },
    { icon: "💎", title: "Коллекционер", desc: "Библиотека 25+ игр" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <div className="neon-border rounded-xl p-6 text-center" style={{ background: "rgba(13,17,23,0.9)" }}>
          <div className="w-20 h-20 rounded-full bg-neon-cyan/10 border-2 border-neon-cyan/40 flex items-center justify-center mx-auto mb-4 animate-glow">
            <Icon name="User" size={32} className="text-neon-cyan" />
          </div>
          <h3 className="font-rajdhani text-xl font-bold text-white mb-1">Игрок_2077</h3>
          <p className="text-sm text-muted-foreground mb-4">Присоединился в 2024</p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[{ v: "47", l: "Игр" }, { v: "128", l: "Часов" }, { v: "12", l: "Отзывов" }].map(s => (
              <div key={s.l} className="bg-white/5 rounded-lg p-2">
                <div className="font-rajdhani font-bold text-lg neon-text">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
          <button className="w-full btn-neon py-2.5 rounded-xl text-sm">Редактировать</button>
        </div>
      </div>

      <div className="lg:col-span-2 flex flex-col gap-5">
        <div className="neon-border rounded-xl p-5" style={{ background: "rgba(13,17,23,0.9)" }}>
          <h3 className="font-rajdhani text-lg font-bold text-white mb-4 section-title">Достижения</h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map(a => (
              <div key={a.title} className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-white">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="neon-border rounded-xl p-5" style={{ background: "rgba(13,17,23,0.9)" }}>
          <h3 className="font-rajdhani text-lg font-bold text-white mb-4 section-title">Недавно скачанные</h3>
          <div className="flex flex-col gap-2">
            {GAMES.slice(0, 3).map(game => (
              <div key={game.id} className="flex items-center gap-3 hover:bg-white/5 rounded-lg p-2 transition-colors">
                <img src={game.image} alt={game.title} className="w-12 h-9 rounded-md object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white">{game.title}</div>
                  <div className="text-xs text-muted-foreground">{game.genre}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <Icon name="Check" size={12} /> Установлена
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const suggestions = GAMES.filter(g =>
    searchQuery.length > 0 &&
    g.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredGames = () => {
    if (activeTab === "new") return GAMES.filter(g => g.isNew);
    if (activeTab === "popular") return GAMES.filter(g => g.isHot);
    return GAMES;
  };

  const displayGames = searchQuery.length > 1
    ? GAMES.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredGames();

  return (
    <div className="min-h-screen hero-bg font-golos relative overflow-x-hidden">

      {/* Header */}
      <header className="glass border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-md bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center animate-glow">
              <span className="font-rajdhani font-bold text-sm" style={{ color: "var(--neon-cyan)" }}>NX</span>
            </div>
            <span className="font-rajdhani font-bold text-xl tracking-wider text-white hidden sm:block">NEXUS</span>
          </div>

          <div ref={searchRef} className="relative flex-1 max-w-xl">
            <div className={`flex items-center gap-2 bg-white/5 border rounded-xl px-4 py-2.5 transition-all duration-300 ${searchFocused ? "border-neon-cyan/50 shadow-[0_0_20px_rgba(0,212,255,0.1)]" : "border-white/10"}`}>
              <Icon name="Search" size={16} className="text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Поиск игр по названию..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => {
                  setSearchFocused(true);
                  if (searchQuery.length > 0) setShowSuggestions(true);
                }}
                onBlur={() => setSearchFocused(false)}
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full font-golos"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setShowSuggestions(false); }}>
                  <Icon name="X" size={14} className="text-muted-foreground hover:text-white transition-colors" />
                </button>
              )}
            </div>

            {showSuggestions && (
              <div className="absolute top-full mt-2 left-0 right-0 glass border border-white/10 rounded-xl overflow-hidden dropdown-animate z-50 shadow-2xl">
                {suggestions.length > 0 ? (
                  suggestions.map(game => (
                    <button
                      key={game.id}
                      onMouseDown={() => { setSearchQuery(game.title); setShowSuggestions(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                    >
                      <img src={game.image} alt={game.title} className="w-10 h-8 rounded-md object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{game.title}</div>
                        <div className="text-xs text-muted-foreground">{game.genre} · {game.price}</div>
                      </div>
                      <Icon name="ArrowUpLeft" size={14} className="text-muted-foreground flex-shrink-0" />
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-5 text-sm text-muted-foreground text-center">
                    <Icon name="SearchX" size={20} className="mx-auto mb-2 opacity-40" />
                    Игра не найдена
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all relative">
              <Icon name="Bell" size={16} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "var(--neon-cyan)" }}></span>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className="w-9 h-9 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center hover:bg-neon-cyan/20 transition-all"
            >
              <Icon name="User" size={16} className="text-neon-cyan" />
            </button>
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="border-b border-white/5 sticky top-16 z-40" style={{ background: "rgba(8,12,18,0.7)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
          {([
            { id: "home", label: "Главная", icon: "Home" },
            { id: "new", label: "Новинки", icon: "Sparkles" },
            { id: "popular", label: "Популярные", icon: "TrendingUp" },
            { id: "profile", label: "Профиль", icon: "User" },
          ] as { id: Tab; label: string; icon: string }[]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-neon-cyan text-neon-cyan"
                  : "border-transparent text-muted-foreground hover:text-white hover:border-white/20"
              }`}
              style={activeTab === tab.id ? { borderBottomColor: "var(--neon-cyan)", color: "var(--neon-cyan)" } : {}}
            >
              <Icon name={tab.icon} size={15} />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">

        {activeTab === "home" && !searchQuery && (
          <>
            {/* Hero banner */}
            <section className="mb-10">
              <div className="relative rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[360px] flex items-center" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)" }}>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-transparent to-purple-500/10"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent"></div>
                <div className="relative z-10 px-8 py-12 max-w-xl">
                  <div className="tag-badge inline-block mb-4" style={{ background: "rgba(255,100,0,0.1)", borderColor: "rgba(255,100,0,0.3)", color: "#ff6400" }}>🔥 Хит недели</div>
                  <h1 className="font-rajdhani text-5xl sm:text-6xl font-bold text-white mb-4 leading-none">
                    Wasteland<br />
                    <span style={{ color: "var(--neon-cyan)", textShadow: "0 0 30px rgba(0,212,255,0.5)" }}>Strike</span>
                  </h1>
                  <p className="text-muted-foreground text-sm mb-7 max-w-md leading-relaxed">
                    Постапокалиптический шутер нового поколения. Сражайтесь за выживание в разрушенном мире.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="btn-neon px-7 py-3 rounded-xl text-sm flex items-center gap-2">
                      <Icon name="Download" size={15} />
                      Скачать бесплатно
                    </button>
                    <button className="px-5 py-3 rounded-xl border border-white/20 text-sm text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                      <Icon name="Play" size={15} />
                      Трейлер
                    </button>
                  </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden">
                  <img src={GAMES[3].image} alt="hero" className="w-full h-full object-cover opacity-35"
                    style={{ maskImage: "linear-gradient(to right, transparent 0%, black 50%)" }} />
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="neon-border rounded-xl p-4 text-center" style={{ background: "rgba(13,17,23,0.8)", opacity: 0, animation: `fade-up 0.5s ease forwards ${i * 0.08 + 0.1}s` }}>
                  <div className="font-rajdhani text-2xl font-bold" style={{ color: "var(--neon-cyan)", textShadow: "0 0 15px rgba(0,212,255,0.5)" }}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </section>
          </>
        )}

        <section>
          {!searchQuery && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-rajdhani text-2xl font-bold text-white section-title">
                {activeTab === "home" && "Все игры"}
                {activeTab === "new" && "Новинки"}
                {activeTab === "popular" && "Популярные"}
                {activeTab === "profile" && "Профиль"}
              </h2>
              {activeTab !== "profile" && (
                <button className="text-xs text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5">
                  <Icon name="SlidersHorizontal" size={13} />
                  Фильтры
                </button>
              )}
            </div>
          )}

          {searchQuery && (
            <div className="mb-6">
              <h2 className="font-rajdhani text-2xl font-bold text-white">
                Результаты для <span style={{ color: "var(--neon-cyan)" }}>"{searchQuery}"</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Найдено: {displayGames.length} игр</p>
            </div>
          )}

          {activeTab === "profile" && !searchQuery ? (
            <ProfilePage />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayGames.map((game, i) => (
                <GameCard key={game.id} game={game} index={i} />
              ))}
              {displayGames.length === 0 && (
                <div className="col-span-3 text-center py-24 text-muted-foreground">
                  <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-base">По запросу "{searchQuery}" ничего не найдено</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <footer className="mt-20 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-rajdhani font-bold text-lg" style={{ color: "var(--neon-cyan)" }}>NEXUS</span>
            <span className="text-muted-foreground text-sm">— платформа для геймеров</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            {["О нас", "Поддержка", "Политика"].map(l => (
              <button key={l} className="hover:text-white transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
